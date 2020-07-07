// const validation = require("./validation");
// const { IdCheck, PasswordCheck, NameCheck } = validation;
import { IdCheck, PasswordCheck, NameCheck } from "./validation.js";

const goLoginActions = () => {
  location.href = "/login";
  console.log("go login");
};

const main = () => {
  IdCheck(";13dfd$"); // false
  // IdCheck('12asv'); // true
  // IdCheck('12asv_-'); // true

  // PasswordCheck(';13dfd$'); // false
  // PasswordCheck('fd123123'); // true

  // NameCheck(';13dfd$');
  // NameCheck('이름');
  // NameCheck('이름123');
  // NameCheck('이름aaa');

  // 페이지 이동. js파일도 해당 pug 파일 내에만 추가하도록 변경하기
  const goLoginbtn = document.getElementById("go_login");
  if (goLoginbtn) {
    goLoginbtn.addEventListener("click", goLoginActions);
  }
};

main();
