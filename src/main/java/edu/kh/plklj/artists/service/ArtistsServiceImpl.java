package edu.kh.plklj.artists.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import edu.kh.plklj.artists.dto.Artist;
import edu.kh.plklj.artists.mapper.ArtistsMapper;
import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.piece.dto.Piece;
import io.lettuce.core.Limit;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArtistsServiceImpl implements ArtistsService{
	private final ArtistsMapper mapper;
	
	@Override
	public List<Artist> getRookieArtists(int cp, int limit) {
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		return mapper.getRookieArtists(rowBounds);
	}
	
	@Override
	public List<Artist> getPopularArtists(int cp, int limit) {
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		return mapper.getPopularArtists(rowBounds);
	}
	
	@Override
	public List<Artist> getAllArtists(int cp, int totalArtistCount, Pagination pagination) {
		int offset = (cp - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return mapper.getAllArtists(rowBounds);
	}

	
	@Override
	public int getTotalArtistCount() {
		return mapper.getTotalArtistCount();
	}
	
	
	@Override
	public Artist getArtistDetail(int artistNo,  int memberNo) {
		return mapper.getArtistDetail(artistNo, memberNo);
	}
	
	@Override
	public List<Map<String, Object>> getArtistWorks(int memberNo, String sort, String order, int cp) {
    int limit = 10; // 한 페이지에 보여줄 개수
    int offset = (cp - 1) * limit; // 현재 페이지에 대한 offset 계산

    // 작품 목록 조회
    List<Artist> works = mapper.getArtistWorks(memberNo, sort, order, new RowBounds(offset, limit));

    // 데이터 가공
    List<Map<String, Object>> workList = new ArrayList<>();
    for (Artist work : works) {
        Map<String, Object> workMap = new HashMap<>();
        workMap.put("pieceNo", work.getPieceNo());
        workMap.put("pieceTitle", work.getPieceTitle());
        workMap.put("sizeX", work.getSizeX());
        workMap.put("sizeY", work.getSizeY());
        workMap.put("pieceRename", work.getPieceRename());
        workMap.put("sellPrice", work.getSellPrice());
        workMap.put("pieceStatus", work.getPieceStatus());
        workList.add(workMap);
    }

    return workList;
}
	
	@Override
	public int getArtistWorkCount(int memberNo) {
		return mapper.getArtistWorkCount(memberNo);
	}
	
	
	@Override
	public Map<String, Object> follow(int memberNo, int artistNo) {
		
		// 1. 팔로우를 한 적이 있나 검사
		int result = mapper.checkFollow(memberNo, artistNo);
		
		// 1 == 누른 적 있음
		// 0 == 누른 적 없음
		
		// 2. 팔로우 여부에 따라 INSERT/DELETE Mapper 호출
		int result2 = 0;
		if(result == 0) {
			result2 = mapper.insertFollow(memberNo, artistNo);
		} else {
			result2 = mapper.deleteFollow(memberNo, artistNo);
		}
		
		// 3. INSERT/DELETE 성공 시 해당 게시글 개수 조회
		int count = 0;
		if(result2 > 0) {
			count = mapper.getFollowCount(memberNo);
		} else {
			return null;
		}
		
		// 4. 팔로우 결과를 Map에 저장해서 반환
		Map<String, Object> map = new HashMap<>();
		
		
		map.put("count", count); // 팔로우 개수
		
		if(result == 0) map.put("check", "insert");
		else            map.put("check", "delete");
		
		
		System.out.println(map.get("count"));
		System.out.println(map.get("check"));
		
		return map;
	}

	










}
