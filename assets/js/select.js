document.addEventListener("DOMContentLoaded", function () {
  // Initialize all select elements
  const selects = document.querySelectorAll(".elegant-select");

  selects.forEach((select) => {
    const selected = select.querySelector(".select-selected");
    const itemsContainer = select.querySelector(".select-items");
    const items = itemsContainer.querySelectorAll(".select-item");
    const searchInput = itemsContainer.querySelector(".select-search");

    // Toggle select on click
    selected.addEventListener("click", function (e) {
      e.stopPropagation();

      // Check if this select is already open
      const isAlreadyOpen = itemsContainer.classList.contains("open");

      // Close all selects first
      closeAllSelects();

      // If it wasn't already open, open it
      if (!isAlreadyOpen) {
        itemsContainer.classList.add("open");
        selected.classList.add("select-arrow-active");

        // Focus search input if it exists
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 10);
        }
      }
    });

    // Handle item selection
    items.forEach((item) => {
      item.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        const text = this.textContent;

        // Update selected text
        selected.querySelector("span").textContent = text;

        // Mark as selected
        items.forEach((i) => i.classList.remove("selected"));
        this.classList.add("selected");

        // Close dropdown
        itemsContainer.classList.remove("open");
        selected.classList.remove("select-arrow-active");

        // Trigger change event
        const event = new Event("change");
        selected.dispatchEvent(event);

        console.log(`Selected value: ${value}, text: ${text}`);
      });
    });

    // Handle search functionality
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();

        items.forEach((item) => {
          if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
      });

      // Prevent search input click from closing dropdown
      searchInput.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }
  });

  // Close selects when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".elegant-select")) {
      closeAllSelects();
    }
  });

  // Close all select dropdowns
  function closeAllSelects() {
    const allSelects = document.querySelectorAll(
      ".select-items, .select-selected"
    );

    allSelects.forEach((element) => {
      if (element.classList.contains("select-items")) {
        element.classList.remove("open");
        // Clear search if exists
        const searchInput = element.querySelector(".select-search");
        if (searchInput) {
          searchInput.value = "";
          // Show all items again
          element.querySelectorAll(".select-item").forEach((item) => {
            item.style.display = "flex";
          });
        }
      } else if (element.classList.contains("select-selected")) {
        element.classList.remove("select-arrow-active");
      }
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllSelects();
    }
  });
});
