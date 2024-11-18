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
	private double sizeX;
	private double sizeY;
	private String regDate;
	private int pieceType;
	private String pieceStatus;
	private int pieceCategoryNo;
	
	private String artistNickname;
	
	// 경매 작품 
	private String startDate;
	private String endDate;
	private String startPrice;
	private String hopePrice;
	private String finalPrice;
	
	// 경매
	private int auction;
	private String bidDate;
	private String endPrice;
	
	// 배송
	private int deliveryNo;
	private int memberNo;
	private String deliveryAddress;
	private int deliveryStatus;
	private String deliveryDate;
	
	private String pieceCategoryName;
	
	// 판매작품
	private String sellPrice;
	
	// ??
	private String openDate;
	private String previewStartDate;
	private String previewEndDate;
	
	
	
	
}
