package edu.kh.plklj.manage.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.manage.mapper.ManageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManageServiceImpl implements ManageService {
	private final ManageMapper mapper;

	@Override
	public Map<String, Object> getSearchList(String code, int cp) {

		int listCount = 0;
		int limit = 0;
		int offset = 0;
		List<Map<String, Object>> resultList = null;
		Pagination pg = null;

		switch (code) {
		case "1":
			  listCount = mapper.getArtistListCount(); // 작가 목록 총 개수 가져오기

	             limit = 4; // 한 페이지당 보여줄 항목 수
	            pg = new Pagination(cp, listCount, limit, 10);

	             offset = (cp - 1) * limit; // 페이징 offset 계산

	            RowBounds artistBounds = new RowBounds(offset, limit); // RowBounds로 페이징 설정
	            resultList = mapper.getArtistList(artistBounds); // 작가 목록 가져오기
	            break;
	            
//            case "2":
//                List<Member> memberList = mapper.getMemberList();
//                for (Member member : memberList) {
//                    resultList.add(convertObjectToMap(member));
//                }
//                break;
		case "3":

			listCount = mapper.getContentListCount();

			 limit = 4;
			pg = new Pagination(cp, listCount, limit, 10);

			 offset = (cp - 1) * limit;

			RowBounds bounds = new RowBounds(offset, limit);

			resultList = mapper.getContentList(bounds);
			break;

		default:
			throw new IllegalArgumentException("Invalid code: " + code);
		}

		Map<String, Object> map = Map.of("resultList", resultList, "pg", pg);

		
		return map;
	}

}
