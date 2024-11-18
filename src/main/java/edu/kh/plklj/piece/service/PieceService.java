package edu.kh.plklj.piece.service;

import java.util.List;
import java.util.Map;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.piece.dto.Category;
import edu.kh.plklj.piece.dto.Piece;

public interface PieceService {

	
	int getsalesPieceCount();

	int getCompletePieceCount();

	//판매 작품 목록 조회
	List<Piece> getSalesPieces(int cp, int salesListCount, Pagination salesPagination, String sort, String order);

	List<Piece> getCompletePieces(int cp, int completeListCount, Pagination complPagination);


	int pieceInsert(Piece piece);

	List<Category> getCategoryList();

	
	// 작품 상세 조회
	Piece getPieceDetail(int pieceNo);

	// 위시 리스트 체크, 해제
	Map<String, Object> onlineWish(int pieceNo);

	

}
