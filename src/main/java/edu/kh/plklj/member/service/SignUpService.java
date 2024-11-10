package edu.kh.plklj.member.service;

import edu.kh.plklj.main.dto.Member;

public interface SignUpService {

	// 아이디 중복검사
	int idCheck(String inputId);

	// 회원가입
	int signUp(Member member, String inputPw);

}
