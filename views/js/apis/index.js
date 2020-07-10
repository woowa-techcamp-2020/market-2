import { REGISTER, LOGIN, ID_CHECK, USER_LIST, GET_SALT } from "./endpoints.js";
import { encryptoPassword, createSalt } from "../encrypto.js";

export const registerAccount = async (data) => {
  data.salt = createSalt();
  data.password = await encryptoPassword(data.password, data.salt);
  data.confirm = await encryptoPassword(data.confirm, data.salt);

  try {
    const response = await fetch(REGISTER.url, {
      method: REGISTER.method,
      headers: {
        "Content-Type": REGISTER.type,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      return await response.json();
    } else {
      console.log("Error: ", await response.json());
    }
  } catch (err) {
    console.log("Error!!");
    return;
  }
};

export const alreadyRegisterId = async (uid) => {
  try {
    const response = await fetch(`${ID_CHECK.url}/${uid}`);
    if (response.status === 200 || response.status === 301) {
      return (await response.json()).result;
    } else {
      console.log("Error, status code: " + response.status);
      return true;
    }
  } catch (err) {
    console.log("Error!!");
    return true;
  }
};

export const login = async (data) => {
  const salt = await getUserSalt(data.uid);
  data.password = await encryptoPassword(data.password, salt);
  console.log(salt, data);

  try {
    const response = await fetch(LOGIN.url, {
      method: LOGIN.method,
      headers: {
        "Content-Type": LOGIN.type,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200 || response.status === 304) {
      return await response.json();
    } else {
      console.log("Error: ", await response.json());
    }
  } catch (err) {
    console.log("Error!!");
    return;
  }
};

const getUserSalt = async (uid) => {
  try {
    const response = await fetch(`${GET_SALT.url}/${uid}`);
    if (response.status === 200 || response.status === 304) {
      return (await response.json()).salt;
    } else {
      console.log("Error: ", await response.json());
    }
  } catch (err) {
    console.log("Error!!");
    return;
  }
};
