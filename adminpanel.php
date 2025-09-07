<html>
  <head>
    <title>Admin-panel</title>
	<meta name="robots" content="noindex, nofollow">
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.45"></script>
	<style>
	    body {padding-bottom: 100px;}
		.container {padding-top: 30px; margin-right: auto; margin-left: auto;}
		.item-case.hide {background-color: #cccccc3b;}
		.item-case.hide:after {
			content: 'not published';
			position: absolute;
			transform: translate(360px, -20px);
			    color: #8c8b8b;
		}
		summary b {font-size: 20px}
		
		@media (min-width: 1200px) {
			.container {
				width: 1170px;
			}
		}
		
		.item-case {
			border: 1px solid rgb(0 0 0 / 50%);
			padding: 18px;
		}
		
		.offset {
			padding: 30px
		}
		
		.line {
			margin-top: 20px
		}
		
		.inp-offs{
			margin-left: 5px
		}
		
		.row-flex {
			display: -webkit-box;
			display: flex;
			display: -ms-flex;
			display: -webkit-flex;
		}
		
		.suggestions {
			border: 1px solid;
			position: absolute;
			background-color: white;
			border-radius: 5px;
			padding: 15px;
		}
		
		.suggestion {
			cursor: pointer;
		}
		
		.suggestion:hover {
			    color: #3f3f3f;
		}
		
		.img-block img, .img-block canvas {
			width: 150px;
			margin-top: 30px; 
			margin-bottom: 30px; 
		}
		
		.logo_canv {			
			border-radius: 100%;
		}
		
		.button-new-case {
			margin-top: 20px
		}
		
		.status {display: inline; margin-left: 10px}
	</style>
  </head>

  <body>
    <div class="container">	
		<div id="app">
		  <input-counter></input-counter>
		</div>		
    </div>

    <script src="js/script.js?<?=time()?>"></script>
  </body>
</html>
