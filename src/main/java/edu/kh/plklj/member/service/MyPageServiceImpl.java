package edu.kh.plklj.member.service;

import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.mapper.LogInMapper;
import edu.kh.plklj.member.mapper.MyPageMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {
	
	private final MyPageMapper mapper;
	private final LogInMapper loginMapper;
	
	private final BCryptPasswordEncoder encoder;
	
	// 이름수정
	@Override
	public int updateName(Member member) {
		return mapper.updateName(member);
	}

	// 비밀번호 변경
	@Override
	public int updatePw(Map<String, String> map) {
		Member getMember =  mapper.getMember(map.get("memberNo"));
		
		if( encoder.matches( map.get("memberPw"), getMember.getMemberPw()) ) {
			getMember.setMemberPw( encoder.encode( map.get("inputPw") ) );
			return loginMapper.changePw(getMember);
		}
		
		return 0;
	}
	
	// 전화번호변경
	@Override
	public int updatePhone(Member member) {
		return mapper.updatePhone(member);
	}
	
	// 은행리스트 보내주기
	@Override
	public List<BankCode> getBankList() {
		return mapper.getBankList();
	}
	
	// 닉네임 중복검사
	@Override
	public int checkNickname(String inputNickname) {
		return mapper.checkNickname(inputNickname);
	}
	
	// 작가 등록
	@Override
	public int insertArtist(Member artist, MultipartFile inputArtistPortfolio, MultipartFile inputArtistProfile) {
		return 0;
	}
}
