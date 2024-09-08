let counter = 0;
function wokerCode() {
  counter += 1;
  setTimeout(() => {
    wokerCode();
  }, 500);
}

wokerCode();
