const URL = "http://localhost:3000/";
const BASE_URL = URL + "api/users";

export const REGISTER = {
  url: BASE_URL,
  method: "POST",
  type: "application/json",
};
export const LOGIN = {
  url: `${BASE_URL}/login`,
  method: "POST",
  type: "application/json",
};
export const ID_CHECK = {
  url: `${BASE_URL}/dup`,
  method: "GET",
  type: "application/json",
};
export const USER_LIST = {
  url: BASE_URL,
  method: "GET",
  type: "application/json",
};
