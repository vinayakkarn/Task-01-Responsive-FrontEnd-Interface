<div align="center">

# 📚 LibraryMS — Library Management System

### A modern, responsive library interface built with pure HTML, CSS & JavaScript

*DecodeLabs Full Stack Development Internship — Project 1 (Frontend Development)*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![No Framework](https://img.shields.io/badge/Frameworks-None-critical?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#-license)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Why Library Management System?](#-why-library-management-system)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Responsive Design](#-responsive-design)
- [JavaScript Concepts Used](#-javascript-concepts-used)
- [Development Workflow](#-development-workflow)
- [Getting Started](#-getting-started)
- [Learning Outcomes](#-learning-outcomes)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)
- [License](#-license)

---

## 🧾 About the Project

**LibraryMS** is a single-page, fully responsive library management interface built entirely with **HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no libraries, no build tools.

Rather than shipping a production-grade system, this project was built as a focused exercise in **frontend fundamentals**: writing semantic markup, structuring layouts with Flexbox and Grid, styling with a consistent design system, and using plain JavaScript to make a static page feel like a real application.

The interface simulates the front-end experience of a digital library — visitors can browse a book collection, search it in real time, page through results, and add new books to the catalogue, all driven by an in-memory JavaScript data set (no backend or database is involved at this stage).

This is **Project 1** of the DecodeLabs Full Stack Development Internship, and it is intentionally scoped to the frontend layer. It is designed to plug into a backend in a later phase of the program without needing a UI rewrite.

---

## 🎯 Why Library Management System?

A library catalogue is a great subject for a frontend-only project because it naturally exercises the skills a frontend developer needs on day one:

- **Listing & filtering data** — the book collection is a real-world example of rendering a data set as UI and filtering it live as the user types.
- **Forms that mutate state** — the "Add Book" form isn't just decorative; it actually updates the in-memory data and re-renders the collection, which is the same mental model used when a form later talks to a real API.
- **Status-driven UI** — book availability ("Available" / "Issued") is a simple but realistic example of conditional styling and badges.
- **A layout worth making responsive** — a two-column collection + form layout, card grids, and a sticky nav give genuine responsive-design problems to solve, rather than a single static page.

Working through these problems here — with dummy JavaScript data instead of a live API — builds the exact patterns (rendering, filtering, event handling, validation) that carry over directly once a real backend is introduced in a later project.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧭 **Sticky Glassmorphism Navbar** | Frosted-glass navigation bar that stays fixed on scroll, with an active-link indicator that tracks the section currently in view |
| 📱 **Animated Mobile Menu** | Hamburger icon that morphs into a close icon and reveals a slide-down mobile navigation panel |
| 🏠 **Hero Section** | Introductory section with a custom hand-built SVG bookshelf illustration (no external image assets required) |
| 🔍 **Live Search** | Instant client-side filtering of the book collection by title, author, or category — synced between the navbar search box and the collection search box |
| 🗂️ **Book Collection Grid** | Responsive card grid rendered dynamically from a JavaScript array, showing cover, title, author, category, and status |
| ➕ **Add Book Form** | Fully validated form that adds a new book to the in-memory catalogue and re-renders the grid instantly — no page reload |
| ✏️ **Edit & 🗑️ Delete** | Inline editing and removal of existing books directly from each card |
| 📄 **Pagination** | Numbered pagination that automatically recalculates based on the active search filter |
| 🎨 **Generated Book Covers** | Each book's "cover" is an SVG generated on the fly from its title initials and a colour, so every card looks intentional without image files |
| 🪄 **Scroll Reveal Animations** | Sections fade and slide into view using the Intersection Observer API as the user scrolls |
| ⬆️ **Back to Top Button** | Appears after scrolling and smoothly returns the user to the top of the page |
| 📐 **Fully Responsive Layout** | Mobile-first layout tested at 375px, 768px, 1024px, and 1440px breakpoints |

> **Note:** This is a single-page application with anchor-based navigation (`#home`, `#books`, `#add-book`, `#contact`) rather than a multi-page site, and it does not currently include a dark mode toggle.

---

## 🛠️ Tech Stack

This project deliberately avoids frameworks so that every interaction can be traced back to plain web fundamentals.

| Technology | Role in this project |
|---|---|
| **HTML5** | Provides the semantic skeleton of the page — `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` are used purposefully instead of generic `<div>` soup, which keeps the markup readable and accessible |
| **CSS3** | Handles all visual design through a custom property (variable) driven design system — colours, spacing, radii, and shadows are defined once and reused everywhere, with Flexbox and CSS Grid used for layout instead of a utility framework |
| **Vanilla JavaScript (ES6+)** | Powers every interactive piece of the page: rendering book cards from data, filtering the collection, handling form submission, managing pagination, and controlling the navbar/menu — all without a single external dependency |

**Google Fonts** (Poppins for headings, Inter for body text) are the only external resources the project relies on.

---

## 📁 Project Structure

```text
Task-01/
│
├── index.html          # Single-page markup: navbar, hero, features, collection, form, footer
├── style.css            # All styling — CSS variables, layout, components, responsive breakpoints
├── script.js             # All interactivity — data, rendering, search, form handling, nav behaviour
│
└── README.md              # Project documentation (this file)
```

> Book covers, the hero illustration, and all UI icons are generated with inline SVG in `index.html`/`script.js`, so no separate image assets are required to run the project.

---

## 📐 Responsive Design

The layout is built **mobile-first**: base styles in `style.css` target small screens, and `@media (min-width: ...)` rules progressively enhance the layout as the viewport grows.

| Concept | How it's applied |
|---|---|
| **Mobile-First CSS** | Every component starts with its narrow-screen styles; wider layouts are added on top via `min-width` media queries, so the page never has to "undo" desktop styling on small screens |
| **Flexbox** | Used for one-dimensional layouts — the navbar's inner row, button groups, book card content, badges, and footer contact rows all rely on Flexbox for alignment |
| **CSS Grid** | Used for two-dimensional layouts — the feature card grid, the book collection grid, and the overall collection/add-book layout on larger screens |
| **Media Queries** | Breakpoints are set at `768px` (tablet), `1024px` (laptop), and `1440px` (desktop), each progressively changing column counts and layout direction |
| **Responsive Navigation** | Below `768px`, the horizontal nav links and search bar collapse into a hamburger-triggered dropdown menu; above that, they render inline in the sticky navbar |

---

## 🧠 JavaScript Concepts Used

`script.js` is intentionally framework-free, so every dynamic behaviour on the page is implemented with core JavaScript:

- **Arrays & Objects** — the book catalogue is a JavaScript array of book objects (`title`, `author`, `category`, `status`, cover colours), acting as an in-memory "database"
- **DOM Manipulation** — book cards, pagination buttons, and cover SVGs are built with `document.createElement` / `innerHTML` and inserted into the page at runtime
- **Functions** — rendering, filtering, pagination, and validation are each broken into small, named functions (`renderBooks`, `getFilteredBooks`, `renderPagination`, `validateField`, etc.)
- **Event Listeners** — `input`, `submit`, `click`, and `scroll` events drive search-as-you-type, form submission, edit/delete actions, and navbar behaviour
- **Search / Filter Logic** — `Array.prototype.filter()` checks the search term against title, author, and category in a case-insensitive way
- **Dynamic Re-rendering** — adding, editing, or deleting a book updates the underlying array and immediately re-renders the grid and pagination from that updated state
- **Form Handling & Validation** — the Add Book form is validated on submit (required fields, category selection) with inline error messages before a new book object is created
- **Intersection Observer API** — used for the scroll-reveal effect, observing elements and toggling a CSS class once they enter the viewport
- **Template Literals & String Escaping** — book data is injected into markup using template literals, with a small `escapeHTML()` helper to keep user-entered text safe

> There is no theme/dark-mode toggle in the current build — all styling is a single, fixed light theme.

---

## 🔄 Development Workflow

The project was built in stages, moving from structure to style to behaviour:

1. **Planning** — Defined the page sections needed (navbar, hero, features, collection, add-book form, footer) and the data shape for a "book"
2. **Wireframing & UI Reference** — Used a UI mockup as a visual reference for layout, spacing, and colour direction without copying it pixel-for-pixel
3. **HTML Structure** — Wrote semantic, accessible markup for every section before any styling was applied
4. **CSS Styling** — Built a CSS-variable-driven design system (colours, spacing scale, radii, shadows), then styled each component using Flexbox and Grid
5. **JavaScript Behaviour** — Implemented the dummy data set, dynamic rendering, search filtering, pagination, form handling, and navbar interactions
6. **Responsive Testing** — Verified the layout at 375px, 768px, 1024px, and 1440px, adjusting breakpoints where the layout broke or felt cramped
7. **Refinement Pass** — Tightened spacing, font sizes, and component proportions after review to keep the UI feeling compact and premium rather than oversized

---

## 🚀 Getting Started

No build tools, package managers, or servers are required — it's a static site.

```bash
# 1. Clone or download the project
git clone https://github.com/vinayakkarn/Task-01-Responsive-FrontEnd-Interface

# 2. Move into the project folder
cd Task-01-Responsive-FrontEnd-Interface

# 3. Open index.html directly in your browser
#    ...or serve it locally for a smoother experience:
python -m http.server 8080
```

Then visit `http://localhost:8080` in your browser (if using the local server), or simply double-click `index.html`.

---

## 🎓 Learning Outcomes

Building LibraryMS end-to-end reinforced several core frontend concepts:

- **Semantic HTML** — Structuring a real page with meaningful tags instead of nested `<div>`s made the CSS and JavaScript easier to reason about, and improved accessibility for free.
- **CSS Architecture** — Designing with CSS custom properties from the start made it possible to retheme spacing and sizing across the entire site by editing a handful of variables, rather than hunting through hundreds of rules.
- **Layout Systems** — Practicing when to reach for Flexbox versus CSS Grid clarified the difference between one-dimensional alignment problems and two-dimensional layout problems.
- **JavaScript as State Management** — Treating the book array as the single source of truth, and always re-rendering from it, mirrors the same pattern used in component-based frameworks — building it by hand made that concept concrete.
- **Responsive Problem-Solving** — Designing mobile-first and layering on complexity at larger breakpoints surfaced real layout bugs (overflow, cramped touch targets) that are easy to miss when designing desktop-first.
- **Attention to Detail** — Iterating on spacing and font sizes after an initial pass taught how much "premium feel" comes down to restraint in sizing, not just colour and layout choices.
- **Frontend Architecture Thinking** — Structuring the JavaScript around small, single-purpose functions (`render`, `filter`, `validate`) made the codebase easier to extend, and previews how this UI will eventually connect to real API calls.

---

## 🔮 Future Enhancements

This project represents the **frontend-only foundation** of a larger Full Stack Library Management System. Planned future phases include:

- 🔗 **Backend API** built with **Express.js** to replace the in-memory JavaScript array
- 🗄️ **Database Integration** with **MongoDB** for persistent book and user data
- 🔐 **Authentication** (login/signup) for members and administrators
- 📦 **Full CRUD Operations** connected to real endpoints instead of local state
- 📚 **Book Borrow/Return System** with due dates and overdue tracking
- 🧑‍💼 **Admin Panel** for managing the catalogue, members, and issued books
- 📊 **Dashboard & Analytics** summarising library activity
- 🕘 **Borrowing History** per member
- 🌙 **Dark Mode** as an additional UI enhancement

---

## 👤 Author

**Vinayak**
B.Sc. Mathematics (Hons.) | CS Minor — Keshav Mahavidyalaya, University of Delhi
DecodeLabs Full Stack Development Intern

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with 📚, ☕, and a lot of `git commit`s

</div>
