package edu.kh.plklj.piece.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.plklj.piece.dto.Category;
import edu.kh.plklj.piece.dto.Piece;

@Mapper
public interface PieceMapper {

	int countSalesPiece();

	List<Piece> selectSalesPiece(@Param("offset") int offset, @Param("limit") int limit);

	int countCompletedPiece();

	List<Piece> selectCompletedPiece(@Param("offset") int offset, @Param("limit") int limit);

	int pieceInsert(Piece piece);

	int pieceSellInert(Piece piece);

	int pieceAuctionInert(Piece piece);

	List<Category> getCategoryList();
	
	




}
