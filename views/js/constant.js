const ID_ERR_MSG = {
  NULL: "아이디를 입력해 주세요.",
  VALUE_ERR:
    "아이디는 영 소문자, 숫자, 특수기호(_), (-)를 사용하여 4~20자리로 입력해 주세요.",
};
const PWD_ERR_MSG = {
  NULL: "비밀번호를 입력해 주세요.",
  VALUE_ERR: "비밀번호는 영문과 숫자를 포함하여 8~20자리로 입력해 주세요.",
};
const EMAIL_ERR_MSG = {
  NULL: "이메일을 입력해 주세요.",
  VALUE_ERR:
    "이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해 주세요.",
};
const PHONE_ERR_MSG = {
  NULL: "휴대폰 번호를 입력해 주세요.",
  VALUE_ERR:
    "이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해 주세요.",
};
const NAME_ERR_MSG = {
  NULL: "이름을 입력해 주세요.",
  MIN_LENGTH: "2자리 이상 입력해 주세요.",
  VALUE_ERR:
    "이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해 주세요.",
};

export { ID_ERR_MSG, PWD_ERR_MSG, EMAIL_ERR_MSG, PHONE_ERR_MSG, NAME_ERR_MSG };
