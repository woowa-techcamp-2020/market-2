import { uidCheck, PasswordCheck, NameCheck } from "./validation.js";
import { alreadyRegisterId } from "./apis/index.js";
import {
  UID_ERR_MSG,
  PWD_ERR_MSG,
  NAME_ERR_MSG,
  PWD_CHECK_ERR_MSG,
  PHONE_ERR_MSG,
  EMAIL_ERR_MSG,
  CERTI_ERR_MSG,
} from "./constant.js";

const inputErrEvent = async (e) => {
  e.preventDefault();
  const name = e.target.name;
  const msg = e.target.nextSibling;

  const addClass = () => {
    e.target.classList.add("input_err");
    msg.classList.add("input_msg_err");
  };

  const removeClass = () => {
    e.target.classList.remove("input_err");
    msg.classList.remove("input_msg_err");
  };

  // null, value err, length
  switch (name) {
    case "uid":
      if (!e.target.value) {
        addClass();
        msg.innerHTML = UID_ERR_MSG.NULL;
        return;
      }
      if (!uidCheck(e.target.value)) {
        addClass();
        msg.innerHTML = UID_ERR_MSG.VALUE_ERR;
      }
      const isDup = await alreadyRegisterId(e.target.value);
      if (isDup) {
        addClass();
        msg.innerHTML = UID_ERR_MSG.DUPLICATED;
      } else {
        removeClass();
      }
      break;
    case "password":
      if (!e.target.value) {
        addClass();
        msg.innerHTML = PWD_ERR_MSG.NULL;
        return;
      }

      if (!PasswordCheck(e.target.value)) {
        addClass();
        msg.innerHTML = PWD_ERR_MSG.VALUE_ERR;
      } else {
        removeClass();
      }
      break;
    case "passwordCheck":
      if (!e.target.value) {
        addClass();
        msg.innerHTML = PWD_CHECK_ERR_MSG.NULL;
        return;
      }
      const password = document.querySelector("#password");
      if (e.target.value !== password.value) {
        addClass();
        msg.innerHTML = PWD_CHECK_ERR_MSG.VALUE_ERR;
      } else {
        removeClass();
      }
      break;
    case "phone":
      if (!e.target.value) {
        addClass();
        msg.innerHTML = PHONE_ERR_MSG.NULL;
        return;
      }
      if (e.target.value.length < 10) {
        addClass();
        msg.innerHTML = PHONE_ERR_MSG.VALUE_ERR;
      } else {
        removeClass();
      }
      break;
    case "phoneVerificationBox":
      if (!e.target.value) {
        addClass();
        msg.innerHTML = CERTI_ERR_MSG.NULL;
        return;
      } else {
        removeClass();
      }
      break;
    case "email":
      if (!e.target.value) {
        addClass();
        msg.innerHTML = EMAIL_ERR_MSG.NULL;
        return;
      }
      if (e.target.value.length < 4) {
        addClass();
        msg.innerHTML = EMAIL_ERR_MSG.VALUE_ERR;
      } else {
        removeClass();
      }
      break;
    case "fullname":
      if (!e.target.value) {
        addClass();
        msg.innerHTML = NAME_ERR_MSG.NULL;
        return;
      }

      if (e.target.value.length < 2) {
        addClass();
        msg.innerHTML = NAME_ERR_MSG.MIN_LENGTH;
        return;
      }

      if (!NameCheck(e.target.value)) {
        addClass();
        msg.innerHTML = NAME_ERR_MSG.VALUE_ERR;
      } else {
        removeClass();
      }
      break;
  }
};

const inputFocusEvent = (e) => {
  const msg = e.target.nextSibling;
  e.target.classList.remove("input_err");
  msg.classList.remove("input_msg_err");
};

const inputAddEvent = () => {
  const input = document.querySelectorAll(".input");

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("blur", inputErrEvent);
  }
};

export { inputAddEvent };
