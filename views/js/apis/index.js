import { REGISTER, LOGIN, ID_CHECK, USER_LIST } from "./endpoints.js";
const xhr = new XMLHttpRequest();

export const register = (data) => {
  xhr.open(REGISTER.method, REGISTER.url);
  xhr.setRequestHeader("Content-type", REGISTER.type);
  // body
  //   const data = {
  //     uid: "loloarla",
  //     email: "siosio34@nate.com",
  //     password: "qwer1@3$",
  //     conirm: "qwer1@3$",
  //     fullName: "이종구",
  //     phone: "010-9924-2316",
  //     address: "동탄순환대로17길31",
  //     advertiseAgree: true,
  //   }
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = (e) => {
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

export const idCheck = (id) => {
  xhr.open(ID_CHECK.method, `${ID_CHECK.url}/${id}`);
  xhr.send();

  xhr.onreadystatechange = (e) => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      console.log(xhr);
    } else {
      console.log("Error!");
    }
  };
  return xhr;
};
