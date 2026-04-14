# Admin Dashboard (Next.js)

A modern, scalable admin dashboard built with Next.js and React.  
This project simulates real-world admin panel functionality with user management, routing, and interactive UI features.

---

## Features

- Dashboard overview with stats and charts
- User management (Add, Edit, Delete)
- Search, filtering, and sorting
- Pagination system
- Dynamic routing (`/dashboard/users/[id]`)
- Dark mode support
- LocalStorage persistence (simulated backend)
- Reusable components and modular structure

---

## Tech Stack

- **Next.js (App Router)**
- **React**
- **CSS Modules**
- **JavaScript (ES6+)**

---

## Project Structure

app/
dashboard/
layout.jsx
page.jsx
users/
page.jsx
[id]/
page.jsx
orders/
settings/

components/
Sidebar.jsx
Header.jsx
Table.jsx
UserForm.jsx

---

## Key Concepts Demonstrated

- Component-based architecture
- Dynamic routing with Next.js
- State management with hooks
- Data persistence (localStorage)
- UI/UX design patterns for admin panels
- Responsive layouts
- Dark mode theming

---

## Future Improvements

- Backend integration (Node.js / database)
- Authentication & role-based access
- Real API instead of localStorage
- Advanced charts & analytics
- Form validation improvements
- Loading skeletons & better error handling

---

## Getting Started

```bash
npm install
npm run dev
```
