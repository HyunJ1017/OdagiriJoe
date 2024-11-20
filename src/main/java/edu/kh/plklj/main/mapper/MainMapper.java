package edu.kh.plklj.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.piece.dto.Piece;

@Mapper
public interface MainMapper {

	/* 메인 화면
	 * @return
	 */
	List<Piece> selectShowViewing();
	
	/* 온라인 갤러리 리스트
	 * @return
	 */
	List<Piece> selectOnlineGalleryList();

	/** 경매 리스트
	 * @param i
	 * @return
	 */
	List<Piece> selectAuctionsList();
  
	/** 검색
	 * @param query
	 * @return
	 */
	List<Piece> selectSearchList(String query);

	/** 검색 리스트 최신순
	 * @return
	 */
	List<Piece> selectSearchListOrderByDateAsc();

	/** 검색 리스트 오래된순
	 * @return
	 */
	List<Piece> selectSearchListOrderByDateDesc();

	/** 검색 리스트 추정가 높은순
	 * @return
	 */
	List<Piece> selectPriceListOrderByPriceDesc();

	/** 검색 리스트 추정가 낮은순
	 * @return
	 */
	List<Piece> selectPriceListOrderByPriceAsc();




}
