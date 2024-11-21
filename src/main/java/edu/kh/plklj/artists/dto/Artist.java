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
	
	// 팔로우 테이블
	private int artistNo;
	
	// 작가 이름
	private String memberName;
	
	// 경력 사항
	private String workDetail;
	
  //작품
	private int pieceNo; // 작품 번호
	private String pieceRename; // 작품 사진
	private String pieceTitle; // 작품 제목
	private String pieceDetail; // 작품 설명
	private double sizeX; // 사이즈 
	private double sizeY; // 사이즈
	private String regDate; // 등록일
	private int pieceType; // 판매 종류(1. 즉시판매 2. 경매) 
	private String pieceStatus; // 작품 상태(N 판매 등록, T 임시저장, B 블라인드, A 경매 대기, S 경매 진행중, D 입금 대기, F 입금(판매) 완료)
	private int pieceCategoryNo; // 카테고리 번호
	
//판매작품
	private String sellPrice; // 판매 가격
	
	// 팔로우
	private int followCount;
	private int followCheck;
	
}
