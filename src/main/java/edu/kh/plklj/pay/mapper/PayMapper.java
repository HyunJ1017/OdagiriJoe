package edu.kh.plklj.pay.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.pay.dto.PaymentDto;

@Mapper
public interface PayMapper {

	int updatePieceStatus(PaymentDto pay);

	int insertPaymentRecord(PaymentDto pay);

	int insertDeliveryRecord1(PaymentDto pay);
	int insertDeliveryRecord0(PaymentDto pay);

}
