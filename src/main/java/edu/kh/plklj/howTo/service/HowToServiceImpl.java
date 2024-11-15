package edu.kh.plklj.howTo.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.howTo.mapper.HowToMapper;
import edu.kh.plklj.notice.dto.Notice;
import edu.kh.plklj.question.dto.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class HowToServiceImpl implements HowToService {
	
	private final HowToMapper mapper;
	
	// 자주묻는 질문 리스트 조회
	@Override
	public List<Question> questionList() {
		return mapper.questionList();
	}
	
	
	// 공지사항 리스트 조회
	@Override
	public Map<String, Object> noticeList(int cp) {
		
		int noticeCount = mapper.noticeCount();
		log.debug("noticeCount : {}", noticeCount);
		
		Pagination pagination = new Pagination(cp, noticeCount, 5, 5);

		// ex) 현재 페이지 2 - 1 = 1
		// 1 * 5 = 5
		// 해당 인덱스 부터 게시물 가져오는 값
		int offset = (cp - 1) * pagination.getLimit();
		
		// 페이징 처리를 위해 제공하는 API
		// offset: 조회 시작 위치를 지정 (0부터 시작)
		// limit: 조회할 데이터의 개수를 지정
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Notice> noticeList = mapper.noticeList(rowBounds);
		log.debug("noticeCount : {}", noticeList);
		
		Map<String, Object> map = Map.of("noticeList", noticeList, "pagination", pagination);
		
		return map;
	}

}
