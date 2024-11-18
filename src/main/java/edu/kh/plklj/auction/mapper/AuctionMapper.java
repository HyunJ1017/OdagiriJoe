package edu.kh.plklj.auction.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.piece.dto.Piece;

@Mapper
public interface AuctionMapper {
	
	// 진행,예정 리스트 조회
	List<Piece> upCommingList();
	
	// piecNo대로 상세 조회
	Piece ongoingDetail(int pieceNo);

}
