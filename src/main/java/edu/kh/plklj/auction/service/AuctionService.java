package edu.kh.plklj.auction.service;

import java.util.Map;

import edu.kh.plklj.piece.dto.Piece;

public interface AuctionService {

	// 진행,예정 리스트 조회
	Map<String, Object> auctionMain();

	// piecNo대로 상세 조회
	Map<String, Object> ongoingDetail(int pieceNo);

}
