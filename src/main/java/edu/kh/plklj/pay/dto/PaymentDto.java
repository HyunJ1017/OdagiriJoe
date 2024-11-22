package edu.kh.plklj.pay.dto;

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
public class PaymentDto {
    private String impUid;          // 결제 고유 ID
    private String merchantUid;     // 상점 거래 ID
    private String errorCode;       // 에러 코드
    private String errorMsg;        // 에러 메시지
    private int    memberNo;        // 회원 번호
    private int    pieceNo;         // 상품 번호
    private String payAmount;       // 결제 금액
    private String payName;         // 결제자 이름
    private String payPhone;        // 결제자 전화번호
    private String deliveryType;    // 배송 유형
    private String deliveryAddress; // 배송 주소
    
    // 작가 환전용
    private String artistNickname;	// 작가명
    private int    allPieceCount;	// 상품 개수
    private int    depositCount;	// 입금완료 상품 개수
    private int    undepositCount;	// 미입금 상품 개수
    private String memberName;		// 입금자명
    private String bankCode;		// 은행코드
	private String bankName;		// 은행명
	private String bankNo;			// 계좌번호
	private String priceSum;		// 환전금액
	private String priceFl;			// 상태코드
	//대기 : 판매된 모든 작품이 입금까지된 작가
	//완료 : 대기상태의 작가에게 돈을 돌려주고 테이블에 등록한 상태
	//보류 : 아직 구매한 회원이 입금을 안한경우
}
