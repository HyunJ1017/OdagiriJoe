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

	/* 메인 페이지 리스트 조회 */
	@Override
	public Map<String, Object> mainPage() {
		List<Piece> showViewing = mapper.selectShowViewing();
		List<Piece> onlineGallery = mapper.selectOnlineGalleryList();
		List<Piece> auctions = mapper.selectAuctionsList();
		
		Map<String, Object> map = Map.of("showViewing", showViewing, "onlineGallery", onlineGallery, "auctions", auctions);
	return map;
	}

	
	/* 검색 리스트 조회 */
	@Override
	public Map<String, Object> searchList(String query) {
		List<Piece> searchList = mapper.selectSearchList(query);
		
		Map<String, Object> map = Map.of(query, searchList);
		return map;
	}

	/* 검색 리스트 최신순 */
	@Override
	public List<Piece> getSearchListOrderByDateAsc() {
		return mapper.selectSearchListOrderByDateAsc();
	}

	/* 검색 리스트 오래된순 */
	@Override
	public List<Piece> getSearchListOrderByDateDesc() {
		return mapper.selectSearchListOrderByDateDesc();
	}

	/* 검색 리스트 추정가 높은순 */
	@Override
	public List<Piece> getPriceListOrderByPriceDesc() {
		return mapper.selectPriceListOrderByPriceDesc();
	}


	/* 검색 리스트 추정가 낮은순 */
	@Override
	public List<Piece> getPriceListOrderByPriceAsc() {
		return mapper.selectPriceListOrderByPriceAsc();
	}




	
}
