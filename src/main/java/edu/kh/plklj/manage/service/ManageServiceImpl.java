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
		List<Map<String, Object>> resultList = null;
		Pagination pg = null;
        
        
        switch (code) {
//            case "1":
//                List<Member> artistList = mapper.getArtistList();
//                for (Member artist : artistList) {
//                    resultList.add(convertObjectToMap(artist));
//                }
//                break;
//            case "2":
//                List<Member> memberList = mapper.getMemberList();
//                for (Member member : memberList) {
//                    resultList.add(convertObjectToMap(member));
//                }
//                break;
            case "3":
            	
            	listCount = mapper.getContentListCount();
            	
            	int limit = 4;
            	pg = new Pagination(cp, listCount, limit, 10);
            	
            	int offset = (cp - 1) * limit;
            	
            	RowBounds bounds = new RowBounds(offset, limit);
            	
                resultList = mapper.getContentList(bounds);
                break;
                
            default:
                throw new IllegalArgumentException("Invalid code: " + code);
        }
        
        
        
        Map<String, Object> map = Map.of("resultList", resultList, "pg", pg);
        
        System.out.println(map.get("resultList"));
        
        return map;
    }
	


}
