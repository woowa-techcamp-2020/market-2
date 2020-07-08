(function emailDomainSelectorChangeEvent() {
  const emailSelector = document.querySelector("#emailSelector");
  const emailInputBox = document.querySelector("#emailDomain");
  if (!(emailSelector || emailInputBox)) return;

  emailSelector.addEventListener("change", () => {
    const selectedIndex = emailSelector.selectedIndex;
    if (selectedIndex === 0) {
      emailInputBox.readOnly = true;
    } else if (selectedIndex === emailSelector.length - 1) {
      emailInputBox.value = "";
      emailInputBox.readOnly = false;
    } else {
      emailInputBox.value = emailSelector.value;
      emailInputBox.readOnly = true;
    }
  });
})();

let timer;
(function activateTimerForPhoneVerification() {
  const phoneSubmit = document.querySelector("#phoneSubmit");
  const phone = document.querySelector("#phone");
  // console.log(phone);
  if (!phone.value) {
    phoneSubmit.disabled = true;
  }
  phone.addEventListener(
    "keyup",
    () => (phoneSubmit.disabled = phone.value ? false : true)
  );
  const phoneVerification = document.querySelector("#phoneVerification");
  const popup = document.querySelector("#phoneVerificationPopup");
  phoneSubmit.addEventListener("click", () => {
    const phoneVerificationSubmit = phoneVerification.getElementsByTagName(
      "button"
    )[0];
    phoneVerification.style.display = "flex";
    phoneSubmit.textContent = "재전송";
    popup.style.display = "block";

    let time = 120;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      const now = new Date().getTime();
      if (time <= 0) {
        phoneVerification.style.display = "none";
        phoneSubmit.textContent = "인증받기";
        clearInterval(timer);
      } else {
        const min = parseInt(time / 60);
        const sec = time - 60 * min;
        const timeForm = `0${min}:${sec > 10 ? sec : "0" + sec}`;
        phoneVerificationSubmit.textContent = timeForm + " 확인";
        time--;
      }
    }, 1000);
  });
})();

(function popupCloseEvent() {
  const popup = document.querySelector("#phoneVerificationPopup");
  const closeBtn = popup.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
})();

function closeDaumPostcode(element) {
  element.style.display = "none";
}

const showFindAddress = () => {
  const element_layer_out = document.querySelector(".layer_out");
  const close_btn = document.querySelector("#btnCloseLayer");
  close_btn.addEventListener("click", () =>
    closeDaumPostcode(element_layer_out)
  );
  element_layer_out.addEventListener("click", (e) => {
    if (e.target.className === "layer_out") {
      element_layer_out.style.display = "none";
    }
  });

  const element_layer = document.getElementById("layer");
  new daum.Postcode({
    oncomplete: function (data) {
      // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.querySelector("#postcode").value = data.zonecode;
      document.querySelector("#address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.querySelector("#detailAddress").focus();

      element_layer_out.style.display = "none";
    },
    width: "100%",
    height: "100%",
    maxSuggestItems: 5,
  }).embed(element_layer);

  element_layer_out.style.display = "block";
};

const registerActioins = () => {
  // document.myForm.action = "/register_comp.pug";
  // document.myForm.method = "post";
  // document.myForm.submit();

  // 유효성 체크
  const form = document.forms["register"];
  const form_inputs = form.querySelectorAll(".input");
  const check = document.querySelector("#mustAgree");
  // console.log(form, form_inputs);
  // console.log(check.checked);

  // TODO 아이디 중복 확인 체크

  // form 태그 안에 input:text validation error 검사
  for (let i = 0; i < form_inputs.length; i++) {
    if (!form_inputs[i].value) {
      form_inputs[i].focus();
      form_inputs[i].blur();
    }
  }

  // validation error 첫번째 요소 focus
  for (let i = 0; i < form_inputs.length; i++) {
    if (!form_inputs[i].value) {
      form_inputs[i].focus();
      return false;
    }
  }

  // TODO 인증번호 필수값

  if (check.checked) {
    // TODO 필수 사항 체크 안내 팝업 띄우기
    return false;
  }

  // TODO 회원가입 api 호출
  const res = true;
  if (res) {
    // TODO 회원가입 성공하면 회원 정보 받아와서 register_comp 페이지에 넘겨주기
    location.href = "/register_comp";
  }

  return true;
};

(function activateAddressFormChangeEvent() {
  const addressCheckBox = document.querySelector("#addressCheckBox");
  const addressElements = document.querySelectorAll(".addressElements");
  if (!(addressCheckBox || addressElements.length)) return;

  const registerForm = document.querySelector("#register");
  registerForm.addEventListener("submit", registerActioins);

  addressCheckBox.addEventListener("change", () => {
    if (addressCheckBox.checked) {
      [...addressElements].map((element) => {
        element.disabled = false;
        if (element.id !== "detailAddress")
          element.addEventListener("click", showFindAddress);
      });
    } else {
      [...addressElements].map((element) => {
        element.disabled = true;
        if (element.id !== "detailAddress")
          element.removeEventListener("click", showFindAddress);
      });
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
