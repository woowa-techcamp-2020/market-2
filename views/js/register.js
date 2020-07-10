import { registerAccount } from "./apis/index.js";
import { createSalt } from "./encrypto.js";

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
      showPopUp(
        "인증번호를 발송했습니다.",
        "휴대폰 SMS 발송된 인증번호를 확인해 주세요."
      );
      const phoneVerificationSubmit = phoneVerification.getElementsByTagName(
        "button"
      )[0];
      phoneVerification.style.display = "flex";
      phoneSubmit.textContent = "재전송";
      // 팝업 내용 추가
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

(function activateAddressFormChangeEvent() {
  const addressCheckBox = document.querySelector("#addressCheckBox");
  const addressElements = document.querySelectorAll(".addressElements");
  if (!(addressCheckBox || addressElements.length)) return;

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

(function registerActioins() {
  const registerForm = document.querySelector("#regBtn");
  registerForm.addEventListener("click", () => {
    // 유효성 체크
    const form = document.forms["register"];
    const form_inputs = form.querySelectorAll(".input");
    const check = document.querySelector("#mustAgree");
    const advertiseAgree = document.querySelector("#adAgree");
    const addressCheckBox = document.querySelector("#addressCheckBox");

    const data = {
      uid: form_inputs[0].value,
      password: form_inputs[1].value,
      confirm: form_inputs[2].value,
      email: form_inputs[3].value + "@" + form_inputs[4].value,
      fullName: form_inputs[5].value,
      phone: form_inputs[6].value,
      address: form_inputs[9].value + " " + form_inputs[10].value,
      advertiseAgree: advertiseAgree.checked,
    };

    // form 태그 안에 input:text validation error 검사
    // filter 사용해서 disabled 제거
    for (let i = 0; i < form_inputs.length; i++) {
      if (!form_inputs[i].value) {
        if (addressCheckBox.checked) {
          form_inputs[i].focus();
          form_inputs[i].blur();
        } else {
          if (!form_inputs[i].classList.contains("addressElements")) {
            form_inputs[i].focus();
            form_inputs[i].blur();
          }
        }
      }
    }

    // validation error 첫번째 요소 focus
    for (let i = 0; i < form_inputs.length; i++) {
      if (!form_inputs[i].value) {
        if (addressCheckBox.checked) {
          form_inputs[i].focus();
          return false;
        } else {
          if (!form_inputs[i].classList.contains("addressElements")) {
            form_inputs[i].focus();
            return false;
          }
        }
      }
    }

    if (!check.checked) {
      showPopUp("필수 항목 확인", "회원가입을 위해 필수 항목에 동의해주세요.");
      return false;
    }

    // data.salt = createSalt();
    // fetch("/api/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    //re

    registerAccount(data).then((res) => {
      if (res.status === 201) {
        localStorage["fullname"] = res.result.fullName;
        localStorage["uid"] = res.result.uid;
        localStorage["email"] = res.result.email;
        localStorage["phone"] = res.result.phone;
        location.href("/register_comp");
      } else {
        console.log("Error fail to create user");
      }
    });
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
