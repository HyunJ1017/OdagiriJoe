package edu.kh.plklj.howTo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.plklj.notice.dto.Notice;
import edu.kh.plklj.question.dto.Question;

@Mapper
public interface HowToMapper {

	// 자주묻는 질문 리스트 조회
	List<Question> questionList();

	// 공사사항 리스트 카운트
	int noticeCount();

	// 공지사항 리스트 조회
	List<Notice> noticeList(RowBounds rowBounds);

}
