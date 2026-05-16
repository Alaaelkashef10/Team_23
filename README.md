# Team_23
# 📘 BLUE SMS — Student Management System

A browser-based Student Management System built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just open `index.html` and go.

---

## ✨ Features

### 🎓 Teacher (Admin) Dashboard
- Add students with name, grade (0–100), absence percentage, and enrolled courses
- View all students in a live table with pass/fail status
- Delete students with a confirmation prompt
- Live stats bar showing total students, passed, failed, and available courses

### 📚 Course Management
- Add and delete courses dynamically
- Courses are available as checkboxes when enrolling students
- 5 default courses pre-loaded on first run: Mathematics, Physics, Chemistry, English, History

### 👨‍🎓 Student Portal
- Read-only view of all enrolled students, their grades, courses, and status

### 🔒 Auth System
- Simple role-based login (Admin / Student)
- Last-used username saved via cookie for convenience

---

## 🚀 Getting Started

No installation needed. Just open the file:

```
index.html
```

Or serve it locally with any static server:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## 🔑 Login Credentials

| Role    | Username  | Password |
|---------|-----------|----------|
| Admin   | `admin`   | `123`    |
| Student | `student` | `123`    |

---

## 📁 Project Structure

```
blue-sms/
├── index.html    # App shell & all view sections
├── style.css     # Full styling (glassmorphism, animations, responsive)
└── script.js     # All app logic (auth, CRUD, storage, UI)
```

---

## 🛠️ Technical Details

### Data Persistence
- Student records and courses are saved to **`localStorage`**, so data survives page refreshes.
- The last-used username is stored in a **cookie** (30-day expiry).

### Pass / Fail Logic
A student's status is computed automatically at creation:
- Grade **≥ 50** → ✔ **Passed**
- Grade **< 50** → ✘ **Failed**

### Data Model

```js
Student { id, name, grade, absence, courses[], status }
Course  { id, name }
```

### Key JavaScript Concepts Used
- ES6 Classes (`Student`, `Course`)
- Array methods: `push`, `filter`, `map`, `find`, `forEach`
- `localStorage` for persistent storage
- Cookie helpers (`setCookie`, `getCookie`, `deleteCookie`)
- DOM manipulation (no frameworks)
- Event listeners with delegation
- Input sanitization via `escapeHtml()` to prevent XSS
- Custom modal system replacing native `alert` / `confirm`

---

## 🎨 Design

- **Color scheme:** Deep navy (`#060d1f`) + Electric blue (`#2563eb`)
- **Fonts:** [Syne](https://fonts.google.com/specimen/Syne) (headings) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) (body)
- **Style:** Glassmorphism cards, animated gradient orbs, dot-grid background
- **Animations:** Slide-up containers, row entrance, counter pop, shake on error, modal bounce-in
- **Responsive:** Adapts to mobile viewports (≤ 600px)

---

## ⚠️ Notes

- This is a **demo / educational project**. Credentials are hardcoded — not suitable for production use.
- All data is stored client-side in the browser. Clearing browser data will reset the app (courses revert to defaults, students are erased).
- No backend, no database, no external dependencies beyond Google Fonts.

---

## 📄 License

MIT — free to use, modify, and distribute.
