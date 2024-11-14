package edu.kh.plklj.howTo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.question.dto.Question;

@Mapper
public interface HowToMapper {

	// 공지사항 리스트 조회
	List<Question> questionList();

}
