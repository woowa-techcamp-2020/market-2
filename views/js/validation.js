// 아이디 4~20자의 영 소문자, 숫자, 특수기호(_), (-)만 사용 가능
export const uidCheck = (val) => {
  const reg = /^[a-z0-9_-]{4,20}$/;

  // 1. 4~20 자릿수 확인
  // 2. 다른 문자 확인
  return reg.test(val) ? true : false;
};

// 비밀번호 영문+숫자 조합만 허용하며, 8~20자. 대문자?
export const PasswordCheck = (val) => {
  var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
  var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
  const en_num_reg = /^.*(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

  // 특수문자, 한글이 들어가 있는지 확인
  if (!pattern_spc.test(val) && !pattern_kor.test(val)) {
    // 영+숫자 조합 확인
    if (en_num_reg.test(val)) {
      return true;
    }
  }
  return false;
};

// 이름 특수문자, 숫자 불가
export const NameCheck = (val) => {
  const reg = /[^가-힣a-zA-Z]/; // 한글, 영어가 아닌 문자 확인

  return reg.test(val) ? false : true;
};
