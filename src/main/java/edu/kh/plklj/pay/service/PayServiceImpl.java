package edu.kh.plklj.pay.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.plklj.pay.dto.PaymentDto;
import edu.kh.plklj.pay.mapper.PayMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PayServiceImpl implements PayService {
	
	private final PayMapper mapper;
	
	// 결제처리
	@Override
	public int insertPay(PaymentDto pay) {
		
		int result = 0;
		
		// 결제받은 작품 상태변경
		result = mapper.updatePieceStatus(pay);
		
		// 결제 테이블에 인서트
		result += mapper.insertPaymentRecord(pay);
		
		// 배달 간다고 하면 배달 테이블에 인서트
		if(pay.getDeliveryType().equals("delivery")) {
			result += mapper.insertDeliveryRecord1(pay);
		} else {
			result += mapper.insertDeliveryRecord0(pay);
		}
		
		return result;
	}

}
