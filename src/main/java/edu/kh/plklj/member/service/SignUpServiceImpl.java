package edu.kh.plklj.member.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.mapper.SignUpMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignUpServiceImpl implements SignUpService{
	
	private final SignUpMapper mapper;
	
	private final BCryptPasswordEncoder encoder;

	// 아이디 중복검사
	@Override
	public int idCheck(String inputId) {
		return mapper.idCheck(inputId);
	}

	// 회원가입
	@Override
	public int signUp(Member member, String inputPw) {
		String encPw = encoder.encode(inputPw);
		member.setMemberPw(encPw);
		return mapper.signUp(member);
	}
}

