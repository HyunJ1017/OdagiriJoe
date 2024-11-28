package edu.kh.plklj.pay.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.plklj.pay.dto.PaymentDto;

@Mapper
public interface WithdrawMapper {

	List<PaymentDto> selectWithdrawList(
			@Param("selectMonth") String selectMonth,
			@Param("artistNickname") String artistNickname);

	List<PaymentDto> selectWithdraw(
			@Param("selectMonth") String selectMonth,
			@Param("intarr") List<Integer> intarr);

	int saveWithdraw(
			@Param("dto") PaymentDto dto,
			@Param("selectMonth") String selectMonth);

}
