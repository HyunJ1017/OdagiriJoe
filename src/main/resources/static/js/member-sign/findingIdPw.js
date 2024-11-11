/* 아이디 찾기

인증번호 발송시
- 전화번호 입력 확인
- 인증번호 발송

인증확인 클릭시
- 인증확인 발송
- 인증완료시 id검색 후 전화번호로 id 전송
*/

/* 비밀번호 찾기

인증번호 발송시
- 아이디, 전화번호 입력 확인
- 아이디, 전화번호 체크
- 아이디 있으면
- (서버에서)인증번호 발송 후 리턴
- 없으면 여기로 리턴

인증확인 클릭시
- 인증확인 발송
- 인증완료시 비밀번호 재입력
*/

const phCheck = document.querySelector("#phCheck");
const inputId = document.querySelector("#inputId");

