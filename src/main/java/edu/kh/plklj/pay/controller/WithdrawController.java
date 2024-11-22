package edu.kh.plklj.pay.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.pay.dto.PaymentDto;
import edu.kh.plklj.pay.service.WithdrawService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("withdraw")
@RequiredArgsConstructor
public class WithdrawController {

	private final WithdrawService service;
	
	//대기 : 판매된 모든 작품이 입금까지된 작가
	//완료 : 대기상태의 작가에게 돈을 돌려주고 테이블에 등록한 상태
	//보류 : 아직 구매한 회원이 입금을 안한경우
	
	// 월별 작가들의 매출액, 판매작품수 조회
	/**
	 * @param selectMonth : 'YYYY-MM'
	 * @param artistNickname : 검색할 작가 닉네임
	 * @return
	 */
	@GetMapping("getWithdrawList")
	@ResponseBody
	public List<PaymentDto> getWithdrawList(
			@RequestParam("selectMonth") String selectMonth,
			@RequestParam(name="selectAritist", required = false, defaultValue = "") String artistNickname ) {
		return service.getWithdrawList(selectMonth, artistNickname);
	}
	
	
	// 파일 출력하기
	@PostMapping("download")
	@ResponseBody
	public int download(
			@RequestBody Map<String, Object> map) {
		
		String selectMonth = map.get("selectMonth").toString();
		List<Integer> intarr = (List<Integer>) map.get("memberNo");
		
		log.info("selectMonth : {}", selectMonth);
		log.info("memberNo : {}", intarr);
		
		int result = service.download(selectMonth, intarr);
		
		return result;
	}
	
	// 대기 -> 완료 상태변환
	@PostMapping("saveWithdrawData")
	@ResponseBody
	public int saveWithdrawData(
			@RequestBody Map<String, Object> map) {
		
		String selectMonth = map.get("selectMonth").toString();
		List<Integer> intarr = (List<Integer>) map.get("memberNo");
		
		log.info("selectMonth : {}", selectMonth);
		log.info("memberNo : {}", intarr);
		
		int result = service.saveWithdrawData(selectMonth, intarr);
		
		return result;
	}
}
