package edu.kh.plklj.main.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Member {
	
	// 회원
	private int memberNo; // 회원 번호
	private String memberName; // 회원 이름
	private String memberId; // 회원 아이디
	private String memberPw; // 회원 비밀번호
	private String memberEmail; // 회원이메일
	private String memberPhone; // 회원 전화번호
	private String artistReg; // 작가 회원 구분
	private String memberDelFl; // 회원 탈퇴 상태
	private int memberPenalty; // 회원 정지 상태
	
	// 작가
	private String artistProfile; // 작가 프로필 사진
	private String artistNickname; // 작가 닉네임
	private String artistPortfolio; // 작가 포트폴리오
	private String bankCode; // 은행코드
	private String bankNo; // 작품
	
	// 입금 기록
	private int recordNo;
	private int payAmount;
	private int payDate;
	private String payType;
	private int payCode;
	private int pieceNo;
	
	
	
}
