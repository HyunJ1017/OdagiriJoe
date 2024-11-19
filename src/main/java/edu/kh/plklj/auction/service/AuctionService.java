package edu.kh.plklj.auction.service;

import java.util.Map;

import edu.kh.plklj.report.dto.Report;

public interface AuctionService {

	// 진행,예정 리스트 조회
	Map<String, Object> auctionMain();

	// piecNo대로 상세 조회
	Map<String, Object> ongoingDetail(int pieceNo, int loginNo);

	// 회원이 누른 좋아요 insert,delete
	Map<String, Object> pieceLike(int pieceNo, int loginNo);

	// 경매예정 신고 처리
	int reportInsert(Report report);


}
