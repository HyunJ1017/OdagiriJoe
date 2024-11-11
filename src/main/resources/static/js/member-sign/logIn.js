/* 로그인 */
const logInBtn = document.querySelector("#logIn-btn");
const inputPw = document.querySelector("#inputPw");
const inputId = document.querySelector("#inputId");

logInBtn.addEventListener("click", () => {

  if(inputId.value.trim().length === 0){
    return;
  }

  if(inputPw.value.trim().length === 0){
    return;
  }

  goLogIn();
});

inputPw.addEventListener("keyup", (e)=> {
  if(e.key === "Enter") goLogIn();
})

const goLogIn = () => {

  const form = document.createElement("form");
  form.action="/member/login";
  form.method="POST";
  const input1 = document.createElement("input");
  input1.type = "hidden";
  input1.value = inputId.value.trim();
  input1.name = "memberId";
  const input2 = document.createElement("input");
  input2.type = "hidden";
  input2.value = inputPw.value.trim();
  input2.name = "memberPw";
  form.append(input1,input2);
  document.querySelector("body").append(form);
  form.submit();
}