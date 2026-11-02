
document.addEventListener("DOMContentLoaded", () => {

    // ==================================
    // 1. SELECT HTML ELEMENTS
    // ==================================

    const searchInput = document.getElementById("searchInput");
    const bookCards = document.querySelectorAll(".book-card");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const noResults = document.getElementById("noResults");

    let selectedCategory = "All";

    // ==================================
    // 2. SEARCH AND FILTER BOOKS
    // ==================================

    function filterBooks() {

        const searchText = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;

        bookCards.forEach(card => {

            const title = card.querySelector("h3")
                ?.textContent.toLowerCase() || "";

            const author = card.querySelector(".book-info p")
                ?.textContent.toLowerCase() || "";

            const category = (card.dataset.category || "").toLowerCase();

            const matchesSearch =
                title.includes(searchText) ||
                author.includes(searchText) ||
                category.includes(searchText);

            const matchesCategory =
                selectedCategory === "All" ||
                category === selectedCategory.toLowerCase();

            const isVisible = matchesSearch && matchesCategory;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        // Show or hide the no-results message
        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }
    }

    // ==================================
    // 3. SEARCH INPUT
    // ==================================

    if (searchInput) {
        searchInput.addEventListener("input", filterBooks);
    }

    // ==================================
    // 4. CATEGORY FILTER BUTTONS
    // ==================================

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            selectedCategory = button.dataset.category || "All";

            filterBooks();
        });

    });

    // ==================================
    // 5. BOOK BORROW FUNCTIONALITY
    // ==================================

    document.querySelectorAll(".borrow-btn").forEach(button => {

        button.addEventListener("click", () => {

            if (button.disabled) return;

            button.textContent = "Borrow request received!";
            button.disabled = true;
            button.classList.add("borrowed");

            button.setAttribute("aria-label", "Borrow request received");

        });

    });

    // ==================================
    // 6. INITIALIZE BOOKNEST
    // ==================================

    filterBooks();

    console.log("BookNest JavaScript loaded successfully!");

});

const openBookForm = document.getElementById("openBookForm");
const bookForm = document.getElementById("bookForm");
const closeBookForm = document.getElementById("closeBookForm");
const bookGrid = document.querySelector(".book-grid");

if (openBookForm && bookForm && bookGrid) {

    openBookForm.addEventListener("click", () => {
        bookForm.hidden = false;
        openBookForm.hidden = true;
    });

    closeBookForm.addEventListener("click", () => {
        bookForm.hidden = true;
        openBookForm.hidden = false;
        bookForm.reset();
    });

    bookForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const title = document.getElementById("bookTitle").value.trim();
        const author = document.getElementById("bookAuthor").value.trim();
        const category = document.getElementById("bookCategory").value;
        const image = document.getElementById("bookImage").value.trim();

        if (!title || !author || !category || !image) {
            alert("Please fill in all book details.");
            return;
        }

        let imageURL;

        try {
            imageURL = new URL(image);

            if (
                imageURL.protocol !== "https:" &&
                imageURL.protocol !== "http:"
            ) {
                throw new Error("Invalid image URL");
            }
        } catch {
            alert("Please enter a valid image URL.");
            return;
        }

        const card = document.createElement("div");
        card.className = "book-card";
        card.dataset.category = category;

        const cover = document.createElement("img");
        cover.src = imageURL.href;
        cover.alt = `Cover of ${title}`;
        cover.loading = "lazy";

        cover.addEventListener("error", () => {
            cover.alt = "Book cover image unavailable";
        });

        const info = document.createElement("div");
        info.className = "book-info";

        const categoryText = document.createElement("span");
        categoryText.className = "book-category";
        categoryText.textContent = category;

        const heading = document.createElement("h3");
        heading.textContent = title;

        const authorText = document.createElement("p");
        authorText.textContent = `By ${author}`;

        const borrowButton = document.createElement("button");
        borrowButton.className = "borrow-btn";
        borrowButton.textContent = "Borrow Book";

        borrowButton.addEventListener("click", () => {
            if (borrowButton.disabled) return;

            borrowButton.textContent = "Borrow request received!";
            borrowButton.disabled = true;
            borrowButton.classList.add("borrowed");
        });

        info.append(categoryText, heading, authorText, borrowButton);
        card.append(cover, info);

        bookGrid.appendChild(card);

        bookForm.reset();
        bookForm.hidden = true;
        openBookForm.hidden = false;

        filterBooks();

        alert("New book added successfully!");
    });
}
