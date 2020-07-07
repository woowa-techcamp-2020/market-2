// 아이디 4~20자의 영 소문자, 숫자, 특수기호(_), (-)만 사용 가능
export const IdCheck = (val) => {
  const reg = /^[a-z0-9_-]{4,20}$/;

  // 1. 4~20 자릿수 확인
  // 2. 다른 문자 확인
  if (reg.test(val)) {
    console.log("true");
    return true;
  }

  console.log("false");
  return false;
};

// 비밀번호 영문+숫자 조합만 허용하며, 8~20자. 대문자?
export const PasswordCheck = (val) => {
  const reg = /^[A-Za-z0-9]{8,20}$/;

  // 1. 8~20 자릿수 확인
  // 2. 다른 문자 확인
  if (reg.test(val)) {
    console.log("true");
    return true;
  }

  console.log("false");
  return false;
};

// 이름 특수문자, 숫자 불가
export const NameCheck = (val) => {
  const reg = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z]/; // 한글, 영어가 아닌 문자 확인

  // 1. 다른 문자 확인
  if (!reg.test(val)) {
    console.log("true");
    return true;
  }

  console.log("false");
  return false;
};

// module.exports = {
//   IdCheck,
//   PasswordCheck,
//   NameCheck,
// };
