package edu.kh.plklj.howTo.service;

import java.util.List;

import edu.kh.plklj.question.dto.Question;

public interface HowToService {

	// 공지사항 리스트 조회
	List<Question> questionList();
	
}
