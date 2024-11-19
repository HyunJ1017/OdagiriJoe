package edu.kh.plklj.piece.mapper;

import java.util.List;
import java.util.Map;

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

	List<Piece> selectCompletedPiece(RowBounds rowBounds, @Param("sort") String sort, @Param("order") String order);

	int pieceInsert(Piece piece);

	int pieceSellInert(Piece piece);

	int pieceAuctionInert(Piece piece);

	List<Category> getCategoryList();

	int saveTemp(Piece piece);

	Piece getTempPiece(int pieceNo);

	int searchTempiece(Piece piece);

	int deleteTemp(Piece piece);
  
	Piece getPieceDetail(Map<String, Integer> map);

	int checkOnlineWish(@Param("pieceNo") int pieceNo,@Param("memberNo")  int memberNo);

	int insertOnlineWish(@Param("pieceNo") int pieceNo,@Param("memberNo")  int memberNo);

	int deleteOnlineWish(@Param("pieceNo") int pieceNo,@Param("memberNo")  int memberNo);

	int getWishCount(int pieceNo);




	
	




}
