const { createApp, ref, defineComponent, computed, onMounted, toRefs } = Vue;
	  
/*********************** Child component ***********************/
const AdditionalFields = defineComponent({
	props: {		
		clienen: String, // value
		targ: String, // tip's array
	},
	setup(props) {
        const { clienen, targ } = toRefs(props);		  
		
		const clientConst = ref(clienen.value);		  
		
		const arr_type = [
		  'Real Estate agency',
		  'Developer',
		  'Suburban real estate',
		  'Commercial real estate',
		  'Luxury real estate',
		  'Industrial real estate',
		  'Retail real estate',
		  'Vacation rentals',
		  'Student housing',
		  'Investment properties',
		  'Co-working spaces',
		  'Co-living spaces'
		]
		  
		const arr_geo = [
		  'Dubai',
		  'Cyprus',
		  'Barcelona',
		  'New York',
		  'London',
		  'Munich',
		  'Paris',
		  'Berlin',
		  'Tokyo',
		  'Sydney',
		  'Toronto',
		  'Singapore'
		]
		  
		const arr_tip = ref([]); 
		
		const suggestionsRefEn = ref(null); 
		
		const fieldInp = ref(null); 
		  
		let arr_tips = [];
		if (targ.value === 'type') {			
			arr_tips = arr_type;
		} else if (targ.value === 'geo') {
			arr_tips = arr_geo;
		}		
		  
		const targ_plac = computed(() => {
			if (targ.value === 'type') {
				return 'Enter the type';
			} else if (targ.value === 'geo') {
				return 'Enter the geo';
			} else {
				return 'Enter the value';
			}
		});
		  
		const title = computed(() => {
			if (targ.value === 'type') {
				return 'Type';
			} else if (targ.value === 'geo') {
				return 'Geo';
			} else {
				return '';
			}
		});			
		  
		const filter_case_type = (event) => {	
			const search = event.target.value.toLowerCase().trim();
		    arr_tip.value = arr_tips.filter(item => item.toLowerCase().startsWith(search));  
		};
		  
		const selectSuggestion = (suggestion) => {
		    clientConst.value = suggestion
			arr_tip.value = []; 			   
		};
		  
        const handleClickOutside = (event) => { 			
			if (suggestionsRefEn.value && !suggestionsRefEn.value.contains(event.target) 
				&& fieldInp.value && !fieldInp.value.contains(event.target)
			) {
              arr_tip.value = []; 
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });          
		  
		return { 
			clientConst, // value
			targ, 	// name attr		
			targ_plac, // placeholder attr
			title, // title
			filter_case_type, 
			selectSuggestion, 			
			suggestionsRefEn, 	// place area tip		
			fieldInp, // place input
			arr_tip 
		};
    },
    template: `
          <div class="line row-flex">
            <b>{{ title }}</b>						
			
			<div>
				<input class="inp-offs" :name="targ" size="40" :placeholder="targ_plac" v-model="clientConst" @input="filter_case_type" @click="filter_case_type" ref="fieldInp">
				
				<div v-if="arr_tip.length" class="suggestions" ref="suggestionsRefEn">
					<div v-for="(suggestion, index) in arr_tip" :key="index" 
								class="suggestion" 
								@click="selectSuggestion(suggestion)">
						{{ suggestion }}
					</div>		  
				</div>
			</div>		
			
          </div>
        `,
});

/*********************** Child component ***********************/

/*********************** "Client Card" component for displaying client information ***********************/
const InputCounter = defineComponent({
	components: { AdditionalFields }, // Child Component
    setup() {		
		  
		const clients = ref([]); // Reactive array for fetched clients

        const fetchClients = async () => {
			try {
				const response = await fetch('inc/data-cases.php'); 
				const data = await response.json();
				//clients.value = data;		

				clients.value = data.map(item => ({
					...item,
					act: "Edit" // add new field
				}));
				
			} catch (error) {
				console.error('Error fetching clients:', error);
			}
        };
			
		onMounted(fetchClients);

		const handleImage = (event) => {
		    const files = event.target.files;
		    const extension = files[0].type;

		    const reader = new FileReader();
		    const loadImage = event.target.closest('.img-block'); 
		    const canvas = loadImage.querySelector('canvas'); 
		    const img_curr = loadImage.querySelector('img'); 
		    const ctx = canvas.getContext('2d');

			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
				  canvas.width = img.width;
				  canvas.height = img.height;
				  ctx.drawImage(img, 0, 0);
				};
				img.src = e.target.result;
				if (img_curr) { img_curr.style.display = 'none' }
			};

		    reader.readAsDataURL(files[0]);
		};
			
		const handleSubmit = async (event) => {
			const form = event.target; 
			const formData = new FormData(form);
			const stat = form.querySelector('.status');
			formData.append('file', form.querySelector('input[name="logo"]').files[0]);
			const id = formData.get('id');  // Это значение поля с атрибутом name="id"
			const index = formData.get('index'); 
			
			const index2 = Number(index);
			const name = formData.get('name'); 

			const isNameDuplicate = clients.value
				.filter((_, i) => i !== index2) 
				.some(client => client.name === name);
			
			console.log(clients.value.filter((_, i) => i !== index2))

			if (isNameDuplicate) {
				stat.innerHTML = `<span style="color: red">Error: The name "${name}" already exists in the client list.</span>`;
				return; 
			}

			try {
				const response = await fetch('inc/case-edit.php', {
					method: 'POST',
					body: formData,
				});

				if (!response.ok) {
					throw new Error(`Ошибка: ${response.statusText}`);
				}	

				const result = await response.json(); 
				
				if(id=='null') {
					const lastId = result.last_id;

					if (lastId) {
						if (index !== -1) {
							clients.value[index].id = lastId;
							clients.value[index].act = "Edit"; 
						}
					}
				}
				
				stat.innerHTML = result.message;
				
			} catch (error) {
				console.error('Error sending data:', error);
				alert('An error occurred while saving the data');
			}
		};		
				
		const addFind = () => {
			clients.value.push({ 
				id: "null",
				name: "New client",
				type: "",
				geo_en: "",
				published: "hide",
				logo: "",
				act: "Add"
			})
		};

        return {addFind, clients, handleImage, handleSubmit}; 
    },
    template: `
          <div>
            <div v-for="(client, index) in clients" :key="index">
			    <details class="item-case" :class="client.published || 'hide'">
				    <summary><b>{{ client.name }}</b></summary>
					<form @submit.prevent="handleSubmit($event)" enctype="multipart/form-data">					
					    <input type="hidden" name="id" :value="client.id">
						<input type="hidden" name="index" :value="index">
						<input type="hidden" name="logo-path" :value="client.logo">						
						
						<div class="offset component">
						    <div>
								<b>Titel</b> 
								<input size="40" class="inp-offs" v-model="client.name" name="name" required> 
							</div>	
							
							<br><br>
							<div>
								<b>Published/hidden</b>
								
								<select class="publish" name="publish" style="margin-left:5px">		
									<option :selected="client.published && client.published === 'hide'" value="hide">Hidden</option>	
									<option :selected="client.published && client.published === 'show'" value="show">Published</option>																				
								</select>
							</div>
							<br><br>							
								
							<additional-fields :clienen="client.type" targ="type"></additional-fields>	
							<additional-fields :clienen="client.geo_en" targ="geo"></additional-fields>										
							
							<div style="margin-top: 20px">
								<div><b>Лого</b></div>							
												
								<div class="img-block">
									<img alt="не загружено" v-if="client.logo" class="img-logo case-img" :src="'img/cases/'+client.logo+'?t='+Date.now()"> 
									<canvas id="logo_canv" class="logo_canv" style="border-radius: 100%;"></canvas>
									<br> 							
									<input class="load_image" name="logo" type="file" @change="handleImage($event)">	
								</div>	
							</div>	
							
							<br><br>							
							
							<input class="update-case" type="submit" :value="client.act+' '+client.name">							
							<div class="status"></div>
						</div>	
					</form>	
                </details>
            </div>
			<button class="button-new-case" @click="addFind()">New Case</button>
            <!--pre>{{ clients }}</pre-->
          </div>
    `,
});

/*********************** "Client Card" component for displaying client information ***********************/

// Initialize Vue app
createApp({
    components: {
        InputCounter,
    },
}).mount('#app');