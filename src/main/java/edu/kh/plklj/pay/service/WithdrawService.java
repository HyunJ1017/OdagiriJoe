package edu.kh.plklj.pay.service;

import java.util.List;

import edu.kh.plklj.pay.dto.PaymentDto;

public interface WithdrawService {

	List<PaymentDto> getWithdrawList(String selectMonth, String artistNickname);

	int download(String selectMonth, List<Integer> intarr);

	int saveWithdrawData(String selectMonth, List<Integer> intarr);

}
