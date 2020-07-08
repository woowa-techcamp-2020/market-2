import { IdCheck, PasswordCheck, NameCheck } from "./validation.js";
import { ID_ERR_MSG, PWD_ERR_MSG, NAME_ERR_MSG } from "./constant.js";

const inputErrEvent = (e) => {
  e.preventDefault();
  // console.log(e);
  //   console.log(e.target.nextSibling);
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
    case "id":
      // TODO 사용중인 아이디도 확인
      if (!e.target.value) {
        addClass();
        msg.innerHTML = ID_ERR_MSG.NULL;
        return;
      }

      if (!IdCheck(e.target.value)) {
        addClass();
        msg.innerHTML = ID_ERR_MSG.VALUE_ERR;
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
    case "name":
      if (!e.target.value) {
        addClass();
        msg.innerHTML = NAME_ERR_MSG.NULL;
        return;
      }

      if (e.target.value.length < 3) {
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
  //   console.log(input);

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("blur", inputErrEvent);
    // input[i].addEventListener("submit", inputErrEvent);
    // input[i].addEventListener("keydown", inputErrEvent);
  }
};

export { inputAddEvent };
