package edu.kh.plklj.sms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.plklj.common.util.RedisUtil;

@Service
public class SmsServiceImpl implements SmsService {
	
	@Autowired
	private RedisUtil redis;

	/** 문자메시지 생성 및 인증키 저장
	 *
	 */
	@Override
	public String createMassage(String phoneNumber) {
		
		String key = createAuthKey();
		
		// 레디스에 키값 저장하기
		redis.setValue(phoneNumber, key, 5*60);
		
		String result = String.format("[연습] [화사:愛:화공]에서 발송된 인증번호는 [%s] 입니다.", key);
		
		return result;
	}
	
	// 랜텀키 생성
	public String createAuthKey() {
	  	String key = "";
	    for(int i=0 ; i< 6 ; i++) {
	      int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
	      if(sel1 == 0) {
	        int num = (int)(Math.random() * 10); // 0~9
	        key += num;
	      }else {
	        char ch = (char)(Math.random() * 26 + 65); // A~Z
	        int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
	        if(sel2 == 0) {
	            ch = (char)(ch + ('a' - 'A')); // 대문자로 변경
	        }
	        key += ch;
	      }
	    }
	    return key;
	  }
	
	// 인증번호 확인
	@Override
	public int authKeyCheck(String phoneNumber, String authKey) {
		
		if(redis.hasKey(phoneNumber) == false) return 0;
		
		if(redis.getValue(phoneNumber).equals(authKey)) return 1;

		return 2;
	}

}
