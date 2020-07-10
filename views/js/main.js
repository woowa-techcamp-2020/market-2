const goPageActions = (url) => {
  location.href = url;
  console.log("go page" + url);
};

const main = () => {
  const goLoginbtn = document.querySelector("#go_login");
  goLoginbtn.addEventListener("click", () => goPageActions("/login"));

  const goRegisterbtn = document.querySelector("#go_register");
  goRegisterbtn.addEventListener("click", () => goPageActions("/register"));

  const rightElement = document.querySelector(".right");

  const h2Text = document.querySelector("h2");
  const fullname = localStorage.getItem("fullname");
  if (fullname) {
    h2Text.innerText = `${fullname}님 환영합니다!`;
    goLoginbtn.style.display = "none";
    rightElement.style.display = "none";
  } else {
    h2Text.innerText = "사장님, 로그인해주세요!";
    goLoginbtn.style.display = "inline-block";
    rightElement.style.display = "flex";
  }
};

main();
