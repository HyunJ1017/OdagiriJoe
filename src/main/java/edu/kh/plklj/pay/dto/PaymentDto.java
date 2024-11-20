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
    private int memberNo;          // 회원 번호
    private int pieceNo;           // 상품 번호
    private String payAmount;       // 결제 금액
    private String payName;         // 결제자 이름
    private String payPhone;        // 결제자 전화번호
    private String deliveryType;    // 배송 유형
    private String deliveryAddress; // 배송 주소
}
