package edu.kh.plklj.piece.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import edu.kh.plklj.common.util.Pagination;
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
	
//	@Override
//	public List<Piece> getSalesPieces(int cp, Pagination salesPagination) {
//		
//		int offset = (cp - 1) * Pagination.getLimit();
//		
//		Pagination salesPagination = new Pagination(cp, salesListCount, 5, 5);
//		
//		RowBounds rowBounds = new RowBounds(offset, Pagination.getLimit());
//			
//		return mapper.selectSalesPiece(offset, rowBounds);
//		
//	}
	
	@Override
	public List<Piece> getSalesPieces(int cp, int salesListCount, Pagination salesPagination, String sort, String order) {
		
		int offset = (cp - 1) * salesPagination.getLimit();

		RowBounds rowBounds = new RowBounds(offset, salesPagination.getLimit());
	
		// 정렬 기준 및 방향 전달
		return mapper.selectSalesPiece(rowBounds, sort, order);
	}
	
	@Override
	public int getCompletePieceCount() {
		return mapper.countCompletedPiece();
	}
	
	@Override
	public List<Piece> getCompletePieces(int cp, int completeListCount, Pagination complPagination) {
		
		int offset = (cp - 1) * complPagination.getLimit(); // 현재 페이지에 따른 시작 위치 계산
		
		RowBounds rowBounds = new RowBounds(offset, complPagination.getLimit());
		
		return mapper.selectCompletedPiece(rowBounds);
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
