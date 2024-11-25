package edu.kh.plklj.pay.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.plklj.common.util.ExcelExporter;
import edu.kh.plklj.pay.dto.PaymentDto;
import edu.kh.plklj.pay.mapper.WithdrawMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class WithdrawServiceImpl implements WithdrawService {
	
	private final WithdrawMapper mapper;
	
	private ExcelExporter excelExport = new ExcelExporter();
	
	//대기 W : 판매된 모든 작품이 입금까지된 작가
	//완료 C : 대기상태의 작가에게 돈을 돌려주고 테이블에 등록한 상태
	//보류 H : 아직 구매한 회원이 입금을 안한경우
	
	// 월별 작가들의 매출액, 판매작품수 조회
	@Override
	public List<PaymentDto> getWithdrawList(String selectMonth, String artistNickname) {
		
		List<PaymentDto> withdrawList = new ArrayList<>();
		
		withdrawList = mapper.selectWithdrawList(selectMonth, artistNickname);
		
		return withdrawList;
	}

	// 엑셀파일 출력하기
	@Override
	public int download(String selectMonth, List<Integer> intarr) {
		
		// 출력할 데이터 가져오기
		List<PaymentDto> list = mapper.selectWithdraw(selectMonth, intarr);
		log.info("list : {}", list);
		
		int result = excelExport.exportToExcel(list, "C:/uploadFiles/");
		
		return result;
	}

	// 송금기록 테이블에 저장하기
	@Override
	public int saveWithdrawData(String selectMonth, List<Integer> intarr) {
		
		// 출력할 데이터 가져오기
		List<PaymentDto> list = mapper.selectWithdraw(selectMonth, intarr);

		int result = 0;
		
		for(PaymentDto dto : list) {
			result += mapper.saveWithdraw(dto);
		}
		
		return result;
	}

}
