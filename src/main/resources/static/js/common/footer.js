document.addEventListener('DOMContentLoaded', function() {
  const fullHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const height = fullHeight - windowHeight;

  const count = getFullHeight(7); // 7개의 구간으로 나눔

  const sectionXBOX = document.querySelectorAll("#leftSide-barBox div");

  window.addEventListener('scroll', function() {
      displayScrollHeight(sectionXBOX, count, height);
  });
});

function getFullHeight(divCount) {
  const sectionS = document.querySelector("#leftSide-barBox");
  for (let i = 0; i < divCount; i++) {
      const div = document.createElement("div");
      sectionS.appendChild(div);
  }
  return divCount; // 생성한 구간(div)의 개수를 반환
}


const displayScrollHeight = (sectionXBOX, count, height) => {
  const scrollHeight = Math.floor((window.scrollY / height) * count);
  
  sectionXBOX.forEach(div => div.classList.remove("currentHeight"));
  
  if (scrollHeight < sectionXBOX.length) {
      sectionXBOX[scrollHeight].classList.add("currentHeight");
  } else {
      sectionXBOX[sectionXBOX.length - 1].classList.add("currentHeight");
  }
};
