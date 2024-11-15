package edu.kh.plklj.howTo.service;

import java.util.List;
import java.util.Map;

import edu.kh.plklj.question.dto.Question;

public interface HowToService {

	// 자주묻는 질문 리스트 조회
	List<Question> questionList();

	// 공지사항 리스트 조회
	Map<String, Object> noticeList(int cp);
	
}
