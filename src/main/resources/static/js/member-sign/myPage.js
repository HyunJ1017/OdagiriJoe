/* 이름변경서비스 */
const nameSec = document.querySelector("#myPage-name");
let nameSecBackUp;

// 이름칸 클릭시
nameSec.addEventListener("click", () => {
  nameSecBackUp = nameSec.innerHTML;
  const name = nameSec.innerTEXT;
  nameSec.innerHTML = "";

  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "text";
  input.value = name;
  input.name = "memberName";
  const div = document.createElement("div");
  div.classList.add("member-hov");
  div.innerText = "수정";
  div.addEventListener("click", () => {submitId()});
  const div2 = document.createElement("div");
  div2.classList.add("member-hov");
  div2.innerText = "취소";
  div2.addEventListener("click", () => { nameSec.innerHTML = nameSecBackUp; });

  label.append(input, div, div2);
  nameSec.append(label);
  input.focus();
})

// 이름 변경 요청
const submitId = () => {

  const inputName = document.querySelector('[name="memberName"]').value.trim();

  if(inputName.length < 2){
    alert("이름을 입력해 주세요");
    return;
  }
  const regEx = /^[가-힣]+$/;
  if (regEx.test(inputName) === false) {
    alert("한글로 된 이름만 입력해 주세요");
    return;
  }
  if(inputName.length > 6){
    alert("6자 까지만 입력해 주세요.");
    return;
  }

  const submitIdObj = {
    "memberNo" : memberNo,
    "memberName" : inputName
  }

  fetch("/member/myPage/updateName", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submitIdObj)
  })
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      nameSec.innerHTML = inputName;
    } else {
      alert("다시 시도해 주새요");
    }
  })
  .catch(err => console.error(err));

};


/* 비밀번호변경 */
