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
	private int memberNo;
	private String memberName;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberPhone;
	private String artistReg;
	private String memberDelFl;
	
	// 작가
	private String artistProfile;
	private String artistNickname;
	private String artistPortfolio;
	private String artistBankName;
	private int artistBankNo;
	
	// 입금 기록
	private int recordNo;
	private int payAmount;
	private int payDate;
	private String payType;
	private int payCode;
	private int pieceNo;
	
	
	
}
