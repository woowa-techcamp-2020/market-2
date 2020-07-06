// const validation = require("./validation");
// const { IdCheck, PasswordCheck, NameCheck } = validation;
import { IdCheck, PasswordCheck, NameCheck } from "./validation.js";
function test() {
  IdCheck(";13dfd$"); // false
  // IdCheck('12asv'); // true
  // IdCheck('12asv_-'); // true

  // PasswordCheck(';13dfd$'); // false
  // PasswordCheck('fd123123'); // true

  // NameCheck(';13dfd$');
  // NameCheck('이름');
  // NameCheck('이름123');
  // NameCheck('이름aaa');

  // console.log(['dfsdfd'])
}
test();
