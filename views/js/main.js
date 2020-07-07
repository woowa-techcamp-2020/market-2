// const validation = require("./validation");
// const { IdCheck, PasswordCheck, NameCheck } = validation;
import { IdCheck, PasswordCheck, NameCheck } from "./validation.js";

const goPageActions = (url) => {
  location.href = url;
  console.log("go page" + url);
};

const main = () => {
  //   IdCheck(";13dfd$"); // false
  // IdCheck('12asv'); // true
  // IdCheck('12asv_-'); // true

  // PasswordCheck(';13dfd$'); // false
  // PasswordCheck('fd123123'); // true

  // NameCheck(';13dfd$');
  // NameCheck('이름');
  // NameCheck('이름123');
  // NameCheck('이름aaa');

  const goLoginbtn = document.querySelector("#go_login");
  goLoginbtn.addEventListener("click", () => goPageActions("/login"));

  const goRegisterbtn = document.querySelector("#go_register");
  goRegisterbtn.addEventListener("click", () => goPageActions("/register"));
};

main();
