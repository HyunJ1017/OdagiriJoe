package edu.kh.plklj.piece.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.plklj.piece.dto.Category;
import edu.kh.plklj.piece.dto.Piece;
import edu.kh.plklj.piece.mapper.PieceMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PieceServiceImpl implements PieceService{
	private final PieceMapper mapper;
	
	@Override
	public int getsalesPieceCount() {
		return mapper.countSalesPiece();
	}
	
	@Override
	public List<Piece> getSalesPieces(int currentPage, int limit) {
		int offset = (currentPage - 1) * limit; // 현재 페이지에 따른 시작 위치 계산
		return mapper.selectSalesPiece(offset, limit);
	}
	
	@Override
	public int getCompletePieceCount() {
		return mapper.countCompletedPiece();
	}
	
	@Override
	public List<Piece> getCompletePieces(int currentPage, int limit) {
		int offset = (currentPage - 1) * limit; // 현재 페이지에 따른 시작 위치 계산
		return mapper.selectCompletedPiece(offset, limit);
	}
	
	// 작품 등록
	@Override
	public int pieceInsert(Piece piece) {
		int result = 0;
		log.debug("piece.getPieceType() : {}", piece.getPieceType() + "");
		log.debug("piece.getPieceType() > 1 : {}", piece.getPieceType() > 1);
		if(piece.getPieceType() > 1) {
			piece.setPieceStatus("A");
		} else {
			piece.setPieceStatus("N");
		}
		
		result = mapper.pieceInsert(piece);
		
		
		if(result == 0) return 0;
		if(piece.getPieceType() < 2) {
			// 즉시판매작품인 경우
			result = mapper.pieceSellInert(piece);
		} else {
			// 경매판매인경우
			result = mapper.pieceAuctionInert(piece);
		}
		return result;
	}
	
	// 작품 카테고리목록 불러오기
	@Override
	public List<Category> getCategoryList() {
		return mapper.getCategoryList();
	}
	









}
