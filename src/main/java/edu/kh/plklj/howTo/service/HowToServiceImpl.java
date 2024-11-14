package edu.kh.plklj.howTo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.plklj.howTo.mapper.HowToMapper;
import edu.kh.plklj.question.dto.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class HowToServiceImpl implements HowToService {
	
	private final HowToMapper mapper;
	
	// 공지사항 리스트 조회
	@Override
	public List<Question> questionList() {
		return mapper.questionList();
	}

}
