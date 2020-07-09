const showPopUp = (title, contents) => {
  const popup = document.querySelector("#popup");
  const closeBtn = popup.querySelector(".close");
  const popup_title = popup.querySelector(".popup-title");
  const popup_contents = popup.querySelector(".popup-contents");

  console.log(popup_title.value, popup_contents.value);
  popup_title.innerText = title;
  popup_contents.innerText = contents;
  popup.style.display = "block";

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popup_title.innerText = "";
    popup_contents.innerText = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
      popup_title.value = "";
      popup_contents.value = "";
    }
  });
};

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
  if (!phone.value) {
    phoneSubmit.disabled = true;
  }
  phone.addEventListener(
    "keyup",
    () => (phoneSubmit.disabled = phone.value ? false : true)
  );

  phoneSubmit.addEventListener("click", () => {
    // 휴대폰 자리수 확인
    if (phone.value.length >= 10) {
      const phoneVerification = document.querySelector("#phoneVerification");
      const phoneVerificationBox = document.querySelector(
        "#phoneVerificationBox"
      );
      showPopUp(
        "인증번호를 발송했습니다.",
        "휴대폰 SMS 발송된 인증번호를 확인해 주세요."
      );
      const phoneVerificationSubmit = phoneVerification.getElementsByTagName(
        "button"
      )[0];
      phoneVerificationBox.disabled = false;
      phoneVerification.style.display = "flex";
      phoneSubmit.textContent = "재전송";

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
      phoneVerificationSubmit.addEventListener("click", () => {
        // 인증 되었습니다.
        if (phoneVerificationBox.value) {
          phoneVerification.style.display = "none";
          phoneSubmit.disabled = true;
          phoneSubmit.textContent = "인증완료";
          clearInterval(timer);
        } else {
          showPopUp(
            "휴대폰 인증",
            "휴대폰으로 받으신 인증번호를 입력해 주세요."
          );
        }
      });
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
  const phone_Certifi = document.querySelector("#phoneVerificationBox");
  const check = document.querySelector("#mustAgree");
  // console.log(form_inputs);
  // console.log(check.checked);

  // TODO 아이디 중복 확인 체크

  // 필수값(input:text) 확인
  const showInput = [...form_inputs].filter((ele) => !ele.disabled);
  // console.log(showInput);
  for (let i = 0; i < showInput.length; i++) {
    if (!showInput[i].value) {
      showInput[i].focus();
      showInput[i].blur();
    }
  }

  for (let i = 0; i < showInput.length; i++) {
    if (!showInput[i].value) {
      showInput[i].focus();
      return false;
    }
  }

  // TODO 인증번호 필수값
  if (!phone_Certifi.value) {
    // TODO 필수 사항 체크 안내 팝업 띄우기
    showPopUp(
      "휴대폰 인증",
      "입력하신 휴대폰에 인증번호를 받아 인증번호를 입력해 주세요."
    );
    return false;
  }

  if (!check.checked) {
    // TODO 필수 사항 체크 안내 팝업 띄우기
    showPopUp("필수 항목 확인", "회원가입을 위해 필수 항목에 동의해주세요.");
    return;
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

const init = () => {
  // 다시 돌아왔을 때 input value 초기화
  const joinCondition = document.querySelector("#join_condition");
  joinCondition.addEventListener("click", () =>
    showPopUp(
      "",
      "정보통신망 이용촉진 및 정보보호 등에 관한 법률에서는 만 14세 미만 아동의 개인정보 수집 시 법정대리인 동의를 받도록 규정하고 있으며, 만 14세 미만 아동이 법정대리인 동의없이 회원가입을 하는 경우 회원탈퇴 또는 서비스 이용이 제한 될 수 있습니다."
    )
  );
};

init();
