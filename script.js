
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
