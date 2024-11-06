document.addEventListener("DOMContentLoaded", intiliaze);

function intiliaze() {
  const selectDropdown = document.querySelectorAll(".select-dropdown");
  selectDropdown.forEach((dropdown) => {
    const selectDropdownMenuLi = document.querySelectorAll(
      ".select-dropdown__menu > li"
    );
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdown.classList.toggle("active");
      toggleArrow(dropdown.childNodes[1].children[1]);
    });
    for (const listItem of selectDropdownMenuLi) {
      listItem.addEventListener("click", function (e) {
        const activeDropdown = document.querySelector(
          ".select-dropdown.active"
        );
        const buttonText = activeDropdown.querySelector(
          ".select-dropdown__btn span"
        );

        activeDropdown.childNodes[1].children[0].textContent =
          e.target.textContent;
      });
    }
  });

  function toggleArrow(ele) {
    if (ele != null) {
      ele.classList.toggle("rotate");
    }
  }
}
