package edu.kh.plklj.auction.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.plklj.piece.dto.Piece;
import edu.kh.plklj.report.dto.Report;

@Mapper
public interface AuctionMapper {
	
	// 진행,예정 리스트 조회
	List<Piece> upCommingList();
	
	// piecNo대로 상세 조회
	Piece ongoingDetail(@Param("pieceNo") int pieceNo, @Param("loginNo") int loginNo);

	// 좋아요 누른적 있는지 검사
	int checkPieceLike(@Param("pieceNo") int pieceNo, @Param("loginNo") int loginNo);

	// 좋아요 여부에 따라 INSERT/DELETE Mapper 호출
	int insertPieceLike(@Param("pieceNo") int pieceNo, @Param("loginNo") int loginNo);

	// 좋아요 여부에 따라 INSERT/DELETE Mapper 호출
	int deletePieceLike(@Param("pieceNo") int pieceNo, @Param("loginNo") int loginNo);

	// like count
	int getLikeCount(int pieceNo);

	int getLikeCheck(@Param("pieceNo") int pieceNo, @Param("loginNo") int loginNo);

	// 경매 신고 처리
	int reportInsert(Report report);
	
	


}
