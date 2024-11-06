window.addEventListener("click", function () {
  const selectedDropdown = document.querySelectorAll(".select-dropdown.active");
  selectedDropdown.forEach((dropdown) => {
    dropdown.classList.remove("active");
  });
});
