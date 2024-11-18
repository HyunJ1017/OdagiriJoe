package edu.kh.plklj.piece.dto;

import edu.kh.plklj.main.dto.Member;
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
public class Piece {

	// 작품
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
	
	private String artistNickname; // 작가 닉네임
	
	// 경매 작품 
	private String startDate; // 경매 시작 날짜
	private String endDate; // 경매 끝난 날짜
	private String startPrice; // 경매 시작가
	private String hopePrice; // 경매 희망가
	
	// 경매
	private int auctionNo; // 입찰 번호
	private String bidDate; // 입찰 시간
	private String endPrice; // 입찰 가격
	
	// 배송
	private int deliveryNo; // 송장 번호
	private int memberNo; // 회원 번호
	private String deliveryAddress; // 배송 주소
	private int deliveryStatus; // 배송 상태
	private String deliveryDate; // 배송 등록일
	
	private String pieceCategoryName;
	
	// 판매작품
	private String sellPrice; // 판매 가격
	
	// 경매 날짜
	private String openDate;
	private String previewStartDate;
	private String previewEndDate;
	

	// 작품 카테고리 이름
	private String pieceCategoryName;
	
	// 위시리스트 관련
	private int wishCount;
	private int wishCheck; // 위시 체크 여부(1== 누른적 있음)
	
	
}
