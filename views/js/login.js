const goPageActions = (url) => {
  location.href = url;
  console.log("go page" + url);
};

const loginActions = () => {
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
  const res = true;
  if (res) {
    // TODO 로그인 성공하면 이름 받아와서 main페이지에 넘겨주기
    goPageActions("/");
  }

  return true;
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

const init = () => {
  const loginForm = document.querySelector("#login");
  loginForm.addEventListener("submit", loginActions);

  const saveId = document.querySelector("#id_save");
  saveId.addEventListener("click", saveIdActions);

  loadIdActions();

  const goRegisterbtn = document.querySelector("#go_register");
  goRegisterbtn.addEventListener("click", () => goPageActions("/register"));
};

init();
