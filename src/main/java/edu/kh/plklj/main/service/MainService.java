package edu.kh.plklj.main.service;

import java.util.List;
import java.util.Map;

import edu.kh.plklj.piece.dto.Piece;

public interface MainService {

	/** 메인 페이지 조회
	 * @return
	 */
	Map<String, Object> mainPage();

	/** 검색
	 * @param query
	 * @return
	 */
	Map<String, Object> searchList(String query);

	/** 검색 목록 최신순
	 * @return
	 */
	List<Piece> getSearchListOrderByDateAsc();

	/** 검색 목록 오래된순
	 * @return
	 */
	List<Piece> getSearchListOrderByDateDesc();

	/** 검색 목록 추정가 높은순
	 * @return
	 */
	List<Piece> getPriceListOrderByPriceDesc();

	/** 검색 목록 추정가 작은순
	 * @return
	 */
	List<Piece> getPriceListOrderByPriceAsc();




}
