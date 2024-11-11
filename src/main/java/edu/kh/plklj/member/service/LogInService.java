package edu.kh.plklj.member.service;

import edu.kh.plklj.main.dto.Member;

public interface LogInService {

	// 로그인
	Member logIn(Member member);

	// 아이디 전화번호 확인
	int searchIdPh(String inputPhone, String inputId);

	// 비밀번호 변경
	int changePw(Member member);

}
