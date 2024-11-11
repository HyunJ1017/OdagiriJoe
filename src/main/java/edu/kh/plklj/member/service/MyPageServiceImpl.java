package edu.kh.plklj.member.service;

import org.springframework.stereotype.Service;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.mapper.MyPageMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {
	
	private final MyPageMapper mapper;
	
	// 이름수정
	@Override
	public int updateName(Member member) {
		return mapper.updateName(member);
	}

}
