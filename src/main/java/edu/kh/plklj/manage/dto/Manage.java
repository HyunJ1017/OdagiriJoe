package edu.kh.plklj.manage.dto;

import java.util.List;

import edu.kh.plklj.main.dto.BankCode;
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
public class Manage {
	
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
		
		// 작가
		private String artistProfile;
		private String artistNickname;
		private String artistPortfolio;
		private String bankCode;
		private String bankNo;
		
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
		private String deliveryIngDate;
		private String deliveryEndDate;
		
		// 판매작품
		private String sellPrice;
		
		// 신고
		private int reportNo;
		private String reportType;
		private String reportContent;
		private String reportDate;
		private String reportReadFl;
		private String reportDelFl;
		
		// 경력 사항
		private int workNo;
		private List<String> workDetail;

		// 공지사항
		private int noticeNo;
		private String noticeTitle;
		private String noticeContent;
		private String noticeDate;
		private String noticeDelFl;
		
		
	

}
