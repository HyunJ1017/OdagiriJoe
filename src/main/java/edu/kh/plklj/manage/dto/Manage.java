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
	
	
	// 관리자
	private int manageNo; // 관리자 번호
	private String manageNickname; // 관리자명
	private String manageId; // 관리자아이디
	private String managePw; // 관리자비밀번호
	private String manageDelFl; // 관리자 탈퇴 여부
	
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
		private int pieceCount; // 팔린 작품 개수
		
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
		
		// 문의
		private int questionNo;
		private String questionContent;
		private String questionDate;
		private String questionDelFl;
		private String questionAnsFl;
		private String questionAnswer;
		private int questionCategoryNo;
		
		// 문의 분류
		private int questionCategoryName;
		
		// 방문자 수 대시보드
		private String visitorDate; // 방문 날짜
		private int dailyVisitor; // 해당 날짜의 방문자 수
		private int weekGroup; // 주차를 나타내는 그룹 번
		private int visitCount; // 방문자 수
		private String clientIp;
		
		// 금액 관련 대쉬보드
		private int recordNo;
		private String merchantUid;
		private int payAmount;
		private String payDate;
		private String payName;
		private String payPhone;
		
		public Manage(List<Manage> dailyTrades, int weeklyTotal, int monthlyTotal) {
		}
	

}
