package edu.kh.plklj.sms.service;

public interface SmsService {

	// 메세지 생성
	String createMassage(String phoneNumber);
	// 아이디리스트 메세지 생성
	String getIdList(String phoneNumber);

	// 랜덤키생성
	String createAuthKey();

	// 인증키 확인
	int authKeyCheck(String phoneNumber, String authKey);


}
