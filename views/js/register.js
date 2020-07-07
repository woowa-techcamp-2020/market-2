(function emailDomainSelectorChangeEvent() {
  const emailSelector = document.querySelector("#emailSelector");
  const emailInputBox = document.querySelector("#emailDomainInputBox");
  if (!(emailSelector || emailInputBox)) return;

  emailSelector.addEventListener("change", () => {
    const selectedIndex = emailSelector.selectedIndex;
    if (selectedIndex === 0) {
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

(function activateAddressFormChangeEvent() {
  const addressCheckBox = document.querySelector("#addressCheckBox");
  const addressElements = document.querySelectorAll(".addressElements");
  if (!(addressCheckBox || addressElements.length)) return;

  addressCheckBox.addEventListener("change", () => {
    if (addressCheckBox.checked) {
      [...addressElements].map((element) => (element.disabled = false));
    } else {
      [...addressElements].map((element) => (element.disabled = true));
    }
  });
})();

(function agreementGroupChangeEvent() {
  const parentAgreement = document.querySelector("#parentAgreement");
  const subAgreementGroup = document.querySelector("#subAgreementGroup");
  const subAgreements = document.querySelectorAll(".subAgreementCheckBox");
  if (!(parentAgreement || subAgreementGroup || subAgreements.length)) return;

  parentAgreement.addEventListener("click", () => {
    if (parentAgreement.checked) {
      [...subAgreements].map((element) => (element.checked = true));
    } else {
      [...subAgreements].map((element) => (element.checked = false));
    }
  });

  subAgreementGroup.addEventListener("click", () => {
    if (
      [...subAgreements].filter((element) => element.checked).length ===
      subAgreements.length
    ) {
      parentAgreement.checked = true;
    } else {
      parentAgreement.checked = false;
    }
  });
})();
