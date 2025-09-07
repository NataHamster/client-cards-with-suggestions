# Client Cards Admin Panel

A simple admin panel for managing client cards with type and location suggestions. Built with Vue 3 and PHP.

---

## Features

- **Add and edit client cards**
- **Autocomplete suggestions** for:
  - Client type (e.g., Real Estate agency, Developer, Commercial real estate)
  - Location (e.g., Dubai, New York, London)
- **Upload client logos** with preview
- **Publish / Hide** clients
- Prevents duplicate client names
- **Load client data as JSON** from the backend (`data-cases.php`)
- Fetches and saves data via PHP backend (`data-cases.php` and `case-edit.php`)

---

## Technologies

- **Frontend:** Vue 3 (Composition API), HTML, CSS
- **Backend:** PHP, MySQL
- **Data format:** JSON
- **AJAX requests** via `fetch`

---

## Project Structure

.
├─ adminpanel.php # Main admin panel
├─ js/script.js # Vue components and logic
├─ inc/
│ ├─ db.php # Database connection
│ ├─ data-cases.php # Fetch client cards
│ └─ case-edit.php # Save/update client cards (gitignored)
├─ img/cases/ # Uploaded logos (gitignored)
