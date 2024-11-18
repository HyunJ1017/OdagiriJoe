package edu.kh.plklj.main.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.main.mapper.MainMapper;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService{
	private final MainMapper mapper;

	/* 메인 리스트 */
	@Override
	public Map<String, Object> mainPage() {
		List<Piece> showViewing = mapper.selectShowViewing();
		List<Piece> onlineGallery = mapper.selectOnlineGalleryList();
		List<Piece> auctions = mapper.selectAuctionsList();
		
		Map<String, Object> map = Map.of("showViewing", showViewing, "onlineGallery", onlineGallery, "auctions", auctions);
	return map;
	}

	/* 검색 */
	@Override
	public Map<String, Object> searchList(String query) {
		List<Piece> searchList = mapper.selectSearchList(query);

		Map<String, Object> map = Map.of(query, searchList);
		return map;
	}
	
}
