package edu.kh.plklj.piece.service;

import java.util.List;

import edu.kh.plklj.piece.dto.Category;
import edu.kh.plklj.piece.dto.Piece;

public interface PieceService {

	
	int getsalesPieceCount();

	List<Piece> getSalesPieces(int currentPage, int limit);

	int getCompletePieceCount();

	List<Piece> getCompletePieces(int currentPage, int limit);

	int pieceInsert(Piece piece);

	List<Category> getCategoryList();


	

}
