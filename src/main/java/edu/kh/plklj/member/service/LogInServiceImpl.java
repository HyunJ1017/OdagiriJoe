package edu.kh.plklj.member.service;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.mapper.LogInMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogInServiceImpl implements LogInService {
	
	private final LogInMapper mapper;
	
	private final BCryptPasswordEncoder encoder;
	
	// id, pw 확인
	@Override
	public Member logIn(Member member) {
		Member getMember =  mapper.signUp(member.getMemberId());
		
		if( encoder.matches( member.getMemberPw(), getMember.getMemberPw()) ) {
			getMember.setMemberPw(null);
			return getMember;
		}
		
		return null;
	}
	
	// 아이디 전화번호 확인
	@Override
	public int searchIdPh(String inputPhone, String inputId) {
		return mapper.searchIdPh(inputPhone, inputId);
	}
	
	// 비밀번호 변경
	@Override
	public int changePw(Member member) {
		member.setMemberPw( encoder.encode( member.getMemberPw() ) );
		return mapper.changePw(member);
	}
}
