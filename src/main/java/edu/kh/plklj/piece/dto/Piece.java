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
	private int pieceNo;
	private String pieceRename;
	private String pieceTitle;
	private String pieceDetail;
	private int sizeX;
	private int sizeY;
	private String regDate;
	private int pieceType;
	private String pieceStatus;
	private int pieceCategoryNo;
	
	private String artistNickname;
	
	// 경매 작품 
	private String startDate;
	private String endDate;
	private int startPrice;
	private int hopePrice;
	private int finalPrice;
	
	// 경매
	private int auction;
	private String bidDate;
	private int endPrice;
	
	// 배송
	private int deliveryNo;
	private int memberNo;
	private String deliveryAddress;
	private int deliveryStatus;
	private String deliveryDate;
	
	// 판매작품
	private int sellPrice;
	
	
	
	
	
	
}
