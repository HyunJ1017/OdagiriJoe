package edu.kh.plklj.pay;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("pay")
@Controller
public class PayTest {
	
	// 임시 결제팝업페이지
	@RequestMapping("test")
	public String test() {
		log.info("[실행]PayTest.test()");
		return "payment/payment";
	}
	
	// 결제완료처리
	@PostMapping("payment/complete")
	public String complete(
			@RequestBody Map<String, String> map) {
		log.info("[실행]PayTest.complete() POST");
		
		log.info("결제응답 : {}", map);
		
	//  예를 들어 merchant_uid가 payment-39ecfa97, m_redirect_url이 https://example.com/payment-redirect인 경우,
	//  결제 성공 시에 https://example.com/payment-redirect?merchant_uid=payment-39ecfa97로 리다이렉트됩니다. ??????
		return "payment/complete";
	}
	
	// 실패시
	@PostMapping("fail")
	public void fail(
			@RequestBody Map<String, String> map) {
		log.info("[실행]PayTest.fail()");
		for(String key : map.keySet()) {
			log.info("{} : {}", key, map.get(key));
		}
	}
	
	

}
