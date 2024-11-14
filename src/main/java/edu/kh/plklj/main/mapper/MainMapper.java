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


}
