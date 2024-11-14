const currentBtn = document.querySelector("#currentBtn");

currentBtn.addEventListener("click", () => {
  location.href = "/auction/currentDetail";
})


const ongoingBtn = document.querySelector("#ongoingBtn");

ongoingBtn.addEventListener("click", () => {
  location.href = "/auction/ongoingDetail";
})