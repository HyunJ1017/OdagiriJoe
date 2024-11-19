package edu.kh.plklj.artists.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Artist {

	// 작가 테이블 컬럼명 필드
	private int memberNo; // 작가 회원 번호
	private String artistProfile; // 작가 프로필 파일명
	private String artistNickname; // 작가 활동명
	private String artistPortfolio; // 포트폴리오 파일명
	private String bankCode; // 은행 코드
	private int    bankNo; // 환전 은행 번호
	private String artistReg; // 작가 승인 여부
	
}
