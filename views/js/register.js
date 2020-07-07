(function emailDomainSelectorOnChangeEvent() {
  const emailSelector = document.querySelector("#emailSelector");
  const emailInputBox = document.querySelector("#emailDomainInputBox");
  emailSelector.addEventListener("change", () => {
    const selectedIndex = emailSelector.selectedIndex;
    if (selectedIndex === 0) {
      emailInputBox.value = "";
      emailInputBox.disabled = true;
    } else if (selectedIndex === emailSelector.length - 1) {
      emailInputBox.value = "";
      emailInputBox.disabled = false;
    } else {
      emailInputBox.value = emailSelector.value;
      emailInputBox.disabled = true;
    }
  });
})();
