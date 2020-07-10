(function initData() {
  const rows = document.querySelectorAll(".val");
  const value = document.querySelector(".dataBundle");
  console.log("obj", value);
  console.log("value", value.value);
  console.log("text", value.textContent);
  rows.forEach((item) => {
    item.value = value.textContent;
    item.textContent = value.textContent;
  });
})();
