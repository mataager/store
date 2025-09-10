document.addEventListener("DOMContentLoaded", () => {
  // Initialize sample data if not exists
  if (!localStorage.getItem("sizePackages")) {
    const sampleData = [
      {
        name: "men shoes",
        from: "40",
        to: "45",
        quantity: "10",
        exceptions: ["39", "46"],
        date: "07/09/2025, 14:02:10",
      },
      {
        name: "me shose 1",
        from: "35",
        to: "45",
        quantity: "10",
        exceptions: ["34", "47"],
        date: "07/09/2025, 15:31:46",
      },
      {
        name: "men shose 2",
        from: "40",
        to: "45",
        quantity: "20",
        exceptions: ["38"],
        date: "07/09/2025, 15:32:00",
      },
    ];
    localStorage.setItem("sizePackages", JSON.stringify(sampleData));
  }

  // Apply transition theme to all elements
  function applyTransitionTheme() {
    const speed = document.getElementById("transitionSpeed").value;
    const type = document.getElementById("transitionType").value;

    // Update CSS variables
    document.documentElement.style.setProperty(
      "--transition-time",
      `${speed}s`
    );
    document.documentElement.style.setProperty("--transition-type", type);

    // Add transition-element class to all interactive elements
    const interactiveElements = [
      "button",
      "a",
      "input",
      "select",
      "textarea",
      ".card",
      ".nav-link",
      ".form-control",
      ".form-select",
      ".btn",
      ".dropdown-item",
      ".list-group-item",
    ];

    interactiveElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("transition-element");
      });
    });
  }

  // Initialize theme
  applyTransitionTheme();

  // Update speed value display
  document
    .getElementById("transitionSpeed")
    .addEventListener("input", function () {
      document.getElementById("speedValue").textContent = `${this.value}s`;
      applyTransitionTheme();
    });

  // Update when transition type changes
  document
    .getElementById("transitionType")
    .addEventListener("change", applyTransitionTheme);

  // Apply to all button
  document
    .getElementById("applyToAll")
    .addEventListener("click", applyTransitionTheme);

  // Color mode toggle functionality
  document.querySelectorAll(".toggle-color-mode").forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button state
      document.querySelectorAll(".toggle-color-mode").forEach((btn) => {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-secondary");
      });
      button.classList.add("active", "btn-primary");
      button.classList.remove("btn-outline-secondary");

      const mode = button.getAttribute("data-mode");

      // Show appropriate container with transition
      if (mode === "picker") {
        document
          .querySelector(".color-picker-container")
          .classList.remove("hidden-section");
        document
          .querySelector(".color-picker-container")
          .classList.add("visible-section");
        document
          .querySelector(".color-image-container")
          .classList.remove("visible-section");
        document
          .querySelector(".color-image-container")
          .classList.add("hidden-section");
      } else {
        document
          .querySelector(".color-image-container")
          .classList.remove("hidden-section");
        document
          .querySelector(".color-image-container")
          .classList.add("visible-section");
        document
          .querySelector(".color-picker-container")
          .classList.remove("visible-section");
        document
          .querySelector(".color-picker-container")
          .classList.add("hidden-section");
      }
    });
  });

  // Size toggle functionality
  document.querySelectorAll(".size-toggle-btn").forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button state
      document.querySelectorAll(".size-toggle-btn").forEach((btn) => {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-secondary");
      });
      button.classList.add("active", "btn-primary");
      button.classList.remove("btn-outline-secondary");

      const target = button.getAttribute("data-target");

      // Show appropriate container with transition
      if (target === "size-creator") {
        document
          .querySelector(".size-creator")
          .classList.remove("hidden-section");
        document
          .querySelector(".size-creator")
          .classList.add("visible-section");
        document
          .querySelector(".package-selector")
          .classList.remove("visible-section");
        document
          .querySelector(".package-selector")
          .classList.add("hidden-section");
      } else {
        document
          .querySelector(".package-selector")
          .classList.remove("hidden-section");
        document
          .querySelector(".package-selector")
          .classList.add("visible-section");
        document
          .querySelector(".size-creator")
          .classList.remove("visible-section");
        document.querySelector(".size-creator").classList.add("hidden-section");
      }
    });
  });

  // Package selector functionality
  const packageSelect = document.querySelector(".package-select");
  const sizePreview = document.querySelector(".size-preview");

  packageSelect.addEventListener("change", function () {
    const packages = JSON.parse(localStorage.getItem("sizePackages")) || [];
    const selectedPackage = packages.find((p) => p.name === this.value);

    if (selectedPackage) {
      let exceptionsHtml = "";
      if (selectedPackage.exceptions && selectedPackage.exceptions.length > 0) {
        exceptionsHtml = `<div class="exceptions-list mt-2">
                                <strong>Exceptions:</strong> 
                                ${selectedPackage.exceptions
                                  .map(
                                    (e) =>
                                      `<span class="exception-chip">${e}</span>`
                                  )
                                  .join("")}
                            </div>`;
      }

      sizePreview.innerHTML = `
                            <div class="size-range"><strong>Sizes:</strong> ${selectedPackage.from} to ${selectedPackage.to}</div>
                            <div><strong>Quantity:</strong> ${selectedPackage.quantity}</div>
                            ${exceptionsHtml}
                        `;
    } else {
      sizePreview.innerHTML = "";
    }
  });

  // Exception handling
  const exceptionValue = document.querySelector(".exception-value");
  const addExceptionBtn = document.querySelector(".add-exception");
  const exceptionsListCreator = document.querySelector(
    ".exceptions-list-creator"
  );
  let currentExceptions = [];

  addExceptionBtn.addEventListener("click", function () {
    const value = exceptionValue.value.trim();
    if (value && !currentExceptions.includes(value)) {
      currentExceptions.push(value);
      updateExceptionsList();
      exceptionValue.value = "";
    }
  });

  function updateExceptionsList() {
    exceptionsListCreator.innerHTML = currentExceptions
      .map(
        (exp) => `
                        <div class="exception-tag">
                            ${exp}
                            <span class="remove" data-value="${exp}">&times;</span>
                        </div>
                    `
      )
      .join("");

    // Add event listeners to remove buttons
    exceptionsListCreator.querySelectorAll(".remove").forEach((btn) => {
      btn.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        currentExceptions = currentExceptions.filter((e) => e !== value);
        updateExceptionsList();
      });
    });
  }

  // Save size range
  const saveSizeBtn = document.querySelector(".save-size");
  const fromSize = document.querySelector(".from-size");
  const toSize = document.querySelector(".to-size");

  saveSizeBtn.addEventListener("click", function () {
    const fromVal = fromSize.value.trim();
    const toVal = toSize.value.trim();

    if (!fromVal || !toVal) {
      alert("Please enter both 'From' and 'To' values");
      return;
    }

    const packageName = prompt("Enter a name for this size package:");
    if (!packageName) return;

    const newPackage = {
      name: packageName,
      from: fromVal,
      to: toVal,
      quantity: "10", // Default value
      exceptions: currentExceptions,
      date: new Date().toLocaleString(),
    };

    // Save to local storage
    const packages = JSON.parse(localStorage.getItem("sizePackages")) || [];
    packages.push(newPackage);
    localStorage.setItem("sizePackages", JSON.stringify(packages));

    // Update select options
    const newOption = document.createElement("option");
    newOption.value = newPackage.name;
    newOption.textContent = `${newPackage.name} (${newPackage.from}-${newPackage.to})`;
    packageSelect.appendChild(newOption);

    // Select the new option
    packageSelect.value = newPackage.name;
    packageSelect.dispatchEvent(new Event("change"));

    // Reset form
    fromSize.value = "";
    toSize.value = "";
    currentExceptions = [];
    updateExceptionsList();

    alert("Size package saved successfully!");
  });

  // Test height transitions
  document.querySelectorAll(".test-height-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const height = this.getAttribute("data-height");
      const container = document.querySelector(".test-height-container");
      const heightDisplay = document.getElementById("currentHeight");

      container.style.height = `${height}px`;
      heightDisplay.textContent = height;
    });
  });
});
