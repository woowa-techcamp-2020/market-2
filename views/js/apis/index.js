import { REGISTER, LOGIN, ID_CHECK, USER_LIST } from "./endpoints.js";
import { encryptoPassword, createSalt } from "../encrypto.js";
const xhr = new XMLHttpRequest();

export const register = (data) => {
  xhr.open(REGISTER.method, REGISTER.url);
  xhr.setRequestHeader("Content-type", REGISTER.type);
  data.mySalt = createSalt();
  data.password = encryptoPassword(data.password, data.mySalt);
  data.confirm = encryptoPassword(data.confirm, data.mySalt);

  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = async (e) => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 201) {
      // 201: Created
      console.log(xhr.responseText);
    } else {
      console.log("Error!");
    }
  };
  return xhr;
};

export const idCheck = async (uid) => {
  xhr.open(ID_CHECK.method, `${ID_CHECK.url}/${uid}`);
  xhr.send();

  xhr.onreadystatechange = (e) => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      const response = JSON.parse(xhr.response);
      return response.result;
    } else {
      console.log("Error!");
      return true;
    }
  };
};

export const login = (data) => {
  return xhr;
};
