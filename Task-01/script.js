/* =========================================================
   LIBRARY MANAGEMENT SYSTEM — SCRIPT
   Vanilla JavaScript only. No frameworks, no backend.
   ========================================================= */

/* -------------------- 1. DUMMY BOOK DATA -------------------- */
// Each book has a solid "cover" color + short title text used to
// fake a book cover with pure CSS/SVG (no external images needed).
let books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    status: "Available",
    coverColor: "#F4E9D8",
    textColor: "#1E293B",
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    status: "Available",
    coverColor: "#C1440E",
    textColor: "#FFF7ED",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    status: "Issued",
    coverColor: "#4C1D95",
    textColor: "#FDE68A",
  },
  {
    id: 4,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    status: "Available",
    coverColor: "#E5E7EB",
    textColor: "#1E293B",
  },
  {
    id: 5,
    title: "The 5 AM Club",
    author: "Robin Sharma",
    category: "Self Help",
    status: "Available",
    coverColor: "#EA580C",
    textColor: "#FFF7ED",
  },
  {
    id: 6,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J. K. Rowling",
    category: "Fantasy",
    status: "Available",
    coverColor: "#7C2D12",
    textColor: "#FDE68A",
  },
  {
    id: 7,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Science",
    status: "Available",
    coverColor: "#B45309",
    textColor: "#FFFBEB",
  },
  {
    id: 8,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    status: "Issued",
    coverColor: "#0F172A",
    textColor: "#F1F5F9",
  },
  {
    id: 9,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Self Help",
    status: "Available",
    coverColor: "#0369A1",
    textColor: "#F0F9FF",
  },
];

let nextId = books.length + 1;

/* -------------------- 2. STATE -------------------- */
const state = {
  searchTerm: "",
  currentPage: 1,
  perPage: 6,
};

/* -------------------- 3. DOM REFERENCES -------------------- */
const bookGrid = document.getElementById("bookGrid");
const collectionEmpty = document.getElementById("collectionEmpty");
const paginationEl = document.getElementById("pagination");
const bookSearchInput = document.getElementById("bookSearchInput");
const navSearchInput = document.getElementById("navSearchInput");
const addBookForm = document.getElementById("addBookForm");
const addBookFeedback = document.getElementById("addBookFeedback");
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
const backToTop = document.getElementById("backToTop");

/* -------------------- 4. BOOK COVER SVG -------------------- */
// Generates a small placeholder "cover" using the book's own title,
// so every card looks intentional without needing real artwork.
function createCoverSVG(book) {
  const initials = book.title
    .split(" ")
    .filter((w) => /[A-Za-z0-9]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return `
    <svg viewBox="0 0 68 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cover of ${escapeHTML(book.title)}">
      <rect width="68" height="92" fill="${book.coverColor}" />
      <rect x="0" y="0" width="6" height="92" fill="rgba(0,0,0,0.12)" />
      <text x="34" y="50" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" font-size="20" fill="${book.textColor}">${escapeHTML(initials)}</text>
      <line x1="14" y1="66" x2="54" y2="66" stroke="${book.textColor}" stroke-width="1" opacity="0.5" />
    </svg>
  `;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* -------------------- 5. RENDER BOOK CARD -------------------- */
function createBookCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";
  card.dataset.id = book.id;

  const badgeClass = book.status === "Available" ? "badge--available" : "badge--issued";

  card.innerHTML = `
    <div class="book-card__cover">${createCoverSVG(book)}</div>
    <div class="book-card__body">
      <h3 class="book-card__title">${escapeHTML(book.title)}</h3>
      <p class="book-card__author">${escapeHTML(book.author)}</p>
      <p class="book-card__category">${escapeHTML(book.category)}</p>
      <span class="badge ${badgeClass}">${book.status}</span>
      <div class="book-card__actions">
        <button class="btn btn--sm btn--edit" data-action="edit" data-id="${book.id}">✏ Edit</button>
        <button class="btn btn--sm btn--delete" data-action="delete" data-id="${book.id}">🗑 Delete</button>
      </div>
    </div>
  `;

  return card;
}

/* -------------------- 6. FILTER + PAGINATE + RENDER -------------------- */
function getFilteredBooks() {
  const term = state.searchTerm.trim().toLowerCase();
  if (!term) return books;

  return books.filter((book) => {
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term)
    );
  });
}

function renderBooks() {
  const filtered = getFilteredBooks();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));

  // Clamp current page in case filtering reduced the results
  if (state.currentPage > totalPages) state.currentPage = totalPages;

  const start = (state.currentPage - 1) * state.perPage;
  const pageItems = filtered.slice(start, start + state.perPage);

  bookGrid.innerHTML = "";

  if (pageItems.length === 0) {
    collectionEmpty.hidden = false;
  } else {
    collectionEmpty.hidden = true;
    pageItems.forEach((book) => bookGrid.appendChild(createBookCard(book)));
  }

  renderPagination(totalPages);
}

/* -------------------- 7. PAGINATION -------------------- */
function renderPagination(totalPages) {
  paginationEl.innerHTML = "";

  if (totalPages <= 1) return;

  const makeBtn = (label, page, opts = {}) => {
    const btn = document.createElement("button");
    btn.className = "pagination__btn";
    if (opts.active) btn.classList.add("pagination__btn--active");
    btn.innerHTML = label;
    btn.disabled = !!opts.disabled;
    btn.addEventListener("click", () => {
      state.currentPage = page;
      renderBooks();
      document.getElementById("books").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return btn;
  };

  // Prev button
  paginationEl.appendChild(
    makeBtn("‹ Prev", state.currentPage - 1, { disabled: state.currentPage === 1 })
  );

  // Page numbers (simple, since dummy data set is small)
  for (let i = 1; i <= totalPages; i++) {
    paginationEl.appendChild(makeBtn(String(i), i, { active: i === state.currentPage }));
  }

  // Next button
  paginationEl.appendChild(
    makeBtn("Next ›", state.currentPage + 1, { disabled: state.currentPage === totalPages })
  );
}

/* -------------------- 8. SEARCH FILTERING -------------------- */
function handleSearchInput(value) {
  state.searchTerm = value;
  state.currentPage = 1;
  renderBooks();
}

bookSearchInput.addEventListener("input", (e) => handleSearchInput(e.target.value));

// The navbar search box mirrors the collection search and jumps to the section
navSearchInput.addEventListener("input", (e) => {
  bookSearchInput.value = e.target.value;
  handleSearchInput(e.target.value);
});

navSearchInput.addEventListener("focus", () => {
  document.getElementById("books").scrollIntoView({ behavior: "smooth", block: "start" });
});

/* -------------------- 9. EDIT / DELETE BOOK -------------------- */
bookGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const book = books.find((b) => b.id === id);
  if (!book) return;

  if (btn.dataset.action === "delete") {
    const confirmed = confirm(`Remove "${book.title}" from your collection?`);
    if (!confirmed) return;
    books = books.filter((b) => b.id !== id);
    renderBooks();
  }

  if (btn.dataset.action === "edit") {
    openEditPrompt(book);
  }
});

// Lightweight inline "edit" using prompt() so no extra markup / modal is
// required to satisfy the DOM-manipulation requirement of the brief.
function openEditPrompt(book) {
  const newTitle = prompt("Book title:", book.title);
  if (newTitle === null) return;

  const newAuthor = prompt("Author:", book.author);
  if (newAuthor === null) return;

  const newStatus = prompt('Status ("Available" or "Issued"):', book.status);
  if (newStatus === null) return;

  book.title = newTitle.trim() || book.title;
  book.author = newAuthor.trim() || book.author;
  book.status = newStatus.trim() === "Issued" ? "Issued" : "Available";

  renderBooks();
}

/* -------------------- 10. ADD BOOK FORM -------------------- */
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("bookTitle");
  const authorInput = document.getElementById("bookAuthor");
  const categorySelect = document.getElementById("bookCategory");
  const statusSelect = document.getElementById("bookStatus");

  let isValid = true;
  isValid = validateField(titleInput, "bookTitleError", "Please enter a book title.") && isValid;
  isValid = validateField(authorInput, "bookAuthorError", "Please enter an author name.") && isValid;

  if (!categorySelect.value) {
    categorySelect.closest(".form-group").classList.add("has-error");
    isValid = false;
  } else {
    categorySelect.closest(".form-group").classList.remove("has-error");
  }

  if (!isValid) return;

  const palette = ["#2563EB", "#F59E0B", "#0369A1", "#7C2D12", "#4C1D95", "#B45309", "#0F172A"];
  const newBook = {
    id: nextId++,
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    category: categorySelect.value,
    status: statusSelect.value,
    coverColor: palette[Math.floor(Math.random() * palette.length)],
    textColor: "#FFFFFF",
  };

  books.unshift(newBook); // newest book appears first
  state.currentPage = 1;
  state.searchTerm = "";
  bookSearchInput.value = "";
  navSearchInput.value = "";
  renderBooks();

  addBookForm.reset();
  statusSelect.value = "Available";

  showFeedback(`"${newBook.title}" was added to your library.`);

  document.getElementById("books").scrollIntoView({ behavior: "smooth", block: "start" });
});

function validateField(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  const group = input.closest(".form-group");

  if (!input.value.trim()) {
    errorEl.textContent = message;
    group.classList.add("has-error");
    return false;
  }

  errorEl.textContent = "";
  group.classList.remove("has-error");
  return true;
}

let feedbackTimeout;
function showFeedback(message) {
  addBookFeedback.textContent = message;
  addBookFeedback.classList.add("is-visible");
  clearTimeout(feedbackTimeout);
  feedbackTimeout = setTimeout(() => addBookFeedback.classList.remove("is-visible"), 3500);
}

/* -------------------- 11. NAVBAR: sticky shadow + mobile menu -------------------- */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  backToTop.hidden = window.scrollY < 500;
});

navToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after tapping a link + set active nav state
document.querySelectorAll("[data-nav]").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Highlight active nav link based on scroll position */
const sections = ["home", "books", "add-book", "contact"].map((id) => document.getElementById(id));
const navLinkEls = document.querySelectorAll("[data-nav]");

function updateActiveNav() {
  let currentId = "home";
  const scrollPos = window.scrollY + var_navbarHeight() + 40;

  sections.forEach((section) => {
    if (section && section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navLinkEls.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", targetId === currentId);
  });
}

function var_navbarHeight() {
  return navbar.offsetHeight || 76;
}

window.addEventListener("scroll", updateActiveNav);

/* -------------------- 12. BACK TO TOP -------------------- */
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* -------------------- 13. SCROLL REVEAL (Intersection Observer) -------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Feature cards and the collection/add-book panes are added dynamically
// via markup, so give them the reveal treatment as well.
document.querySelectorAll(".collection, .add-book").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* -------------------- 14. FOOTER YEAR -------------------- */
document.getElementById("footerYear").textContent = new Date().getFullYear();

/* -------------------- 15. INITIAL RENDER -------------------- */
renderBooks();
updateActiveNav();
