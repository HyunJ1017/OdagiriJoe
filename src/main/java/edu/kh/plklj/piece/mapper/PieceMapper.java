package edu.kh.plklj.piece.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import edu.kh.plklj.piece.dto.Category;
import edu.kh.plklj.piece.dto.Piece;

@Mapper
public interface PieceMapper {

	int countSalesPiece();

	List<Piece> selectSalesPiece(RowBounds rowBounds, @Param("sort") String sort, @Param("order") String order);

	int countCompletedPiece();

	List<Piece> selectCompletedPiece(RowBounds rowBounds);

	int pieceInsert(Piece piece);

	int pieceSellInert(Piece piece);

	int pieceAuctionInert(Piece piece);

	List<Category> getCategoryList();
	
	




}
