package edu.kh.plklj.pay.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.pay.dto.PaymentDto;
import edu.kh.plklj.pay.service.PayService;


@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("payment")
@PropertySource("classpath:/config.properties")
public class Payment {
	
	private final PayService service;
	
	@Value("${iamport.chennel.key}")
	private String chennelKey;
	
	@Value("${iamport.chennel.id}")
	private String chennelId;
	
	// 결제완료처리
	@PostMapping("payment/complete")
	@ResponseBody
	public int complete(
			@RequestBody PaymentDto pay,
			Model model) {
		log.info("[실행]PayTest.complete() POST");
		
		// 전달받은 데이터 서비스로 전달하여 데이터처리
		int result = service.insertPay(pay);
		
		log.info("[결제]결제번호 : {}", pay.getMerchantUid());
		log.info("[결제]결제회원 : {}", pay.getMemberNo());
		log.info("[결제]결제금액 : {}", pay.getPayAmount());
		
		return result;
	}
	
	// 실패시
	@PostMapping("fail")
	@ResponseBody
	public void fail(
			@RequestBody Map<String, String> map) {
		log.info("[실행]PayTest.fail()");
		for(String key : map.keySet()) {
			log.info("{} : {}", key, map.get(key));
		}
	}
	
	/** 내 채널키 돌려주기
	 * @return
	 */
	@GetMapping("pleseKey")
	@ResponseBody
	public Map<String, String> pleseKey() {
		Map<String, String> map = new HashMap<>();
		map.put("chennelKey", chennelKey);
		map.put("chennelId", chennelId);
		return map;
	}
	

}
