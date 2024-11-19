document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const selectDropdowns = document.querySelectorAll(".select-dropdown");

  selectDropdowns.forEach((dropdown) => {
    const dropdownMenu = dropdown.querySelector(".select-dropdown__menu");
    const dropdownItems = dropdownMenu.querySelectorAll("li");

    // Toggle dropdown on button click
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdown.classList.toggle("active");
      toggleArrow(dropdown.querySelector(".arrow"));
    });

    // Add click listeners to each <li> within the current dropdown
    dropdownItems.forEach((listItem) => {
      listItem.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent triggering the document click handler

        const selectedText = e.target.textContent;

        // Update the selected text in the current dropdown button
        dropdown.querySelector(".select-dropdown__btn span").textContent =
          selectedText;

        // Optional: Add/remove selected class
        dropdownItems.forEach((item) => item.classList.remove("selected"));
        listItem.classList.add("selected");

        // Close the dropdown and reset the arrow
        dropdown.classList.remove("active");
        toggleArrow(dropdown.querySelector(".arrow"));
      });
    });
  });

  // Toggle arrow rotation
  function toggleArrow(ele) {
    if (ele) {
      ele.classList.toggle("rotate");
    }
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", function () {
    selectDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
      const arrow = dropdown.querySelector(".arrow");
      if (arrow) arrow.classList.remove("rotate");
    });
  });
}
