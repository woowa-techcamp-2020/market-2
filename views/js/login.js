import { login, registerAccount } from "./apis/index.js";
const goPageActions = (url) => {
  location.href = url;
};

const loginActions = async () => {
  const form = document.forms["login"];
  const form_inputs = form.querySelectorAll(".input");
  //   console.log(form, form_inputs);

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

  // 로그인 api 호출
  const data = {
    uid: form_inputs[0].value,
    password: form_inputs[1].value,
  };
  const res = await login(data);
  if (res.status === 200 || res.status === 304) {
    localStorage.setItem("fullname", res.result.fullName);
    goPageActions("/");
  }
};

const loadIdActions = () => {
  const id = document.querySelector("#id");
  const save_checkbox = document.querySelector("#id_save");
  const saveId = localStorage.getItem("save_id");
  if (saveId) {
    id.value = saveId;
    save_checkbox.checked = true;
  }
};

const saveIdActions = () => {
  const id = document.querySelector("#id");
  const save_checkbox = document.querySelector("#id_save");
  if (save_checkbox.checked) {
    localStorage.setItem("save_id", id.value);
  } else {
    localStorage.removeItem("save_id");
  }
};

const init = async () => {
  const loginForm = document.querySelector("#login");
  loginForm.addEventListener("submit", loginActions);

  const saveId = document.querySelector("#id_save");
  saveId.addEventListener("click", saveIdActions);

  loadIdActions();

  // const data = {
  //   uid: "loloarla",
  //   email: "siosio34@nate.com",
  //   password: "qwer1@3$",
  //   conirm: "qwer1@3$",
  //   fullName: "이종구",
  //   phone: "010-9924-2316",
  //   address: "동탄순환대로17길31",
  //   advertiseAgree: true,
  // };

  // const regi = await register(data);
  // console.log(regi);

  const goRegisterbtn = document.querySelector("#go_register");
  goRegisterbtn.addEventListener("click", () => goPageActions("/register"));
};

init();
