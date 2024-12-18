package edu.kh.plklj.piece.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.piece.dto.Category;
import edu.kh.plklj.piece.dto.Piece;
import edu.kh.plklj.piece.mapper.PieceMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
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
	public List<Piece> getCompletePieces(int cp, int completeListCount, Pagination complPagination, String sort, String order) {
		
		int offset = (cp - 1) * complPagination.getLimit(); // 현재 페이지에 따른 시작 위치 계산
		
		RowBounds rowBounds = new RowBounds(offset, complPagination.getLimit());
		
		return mapper.selectCompletedPiece(rowBounds, sort, order);
	}
	
	// 작품 등록
	@Override
	public int pieceInsert(Piece piece) {
		int result = 0;
		
		// 작품 공통사항 등록	
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
	

	// 작품 임시저장
	@Override
	public int saveTemp(Piece piece) {
		return mapper.saveTemp(piece);
	}
	
	// 작품 상세 조회
	@Override
	public Piece getPieceDetail(Map<String, Integer> map) {
		return mapper.getPieceDetail(map);
	}
	
	// 작품 상세조회
	@Override
	public Piece getPieceDetail(int pieceNo) {
		return mapper.getPieceInfo(pieceNo);
	}

	// 위시 리스트 체크, 해제
	@Override
	public Map<String, Object> onlineWish(int pieceNo, int memberNo) {
		
		// 1) 좋아요 누른 적 있나 검사
		int result = mapper.checkOnlineWish(pieceNo, memberNo);
		
		// result == 1 : 누른 적 있음
		// result == 0 : 누른 적 없음
		
		// 2) 좋아요 여부에 따라 INSERT/DELETE Mapper 호출
		int result2 = 0;
		if(result == 0) {
			result2 = mapper.insertOnlineWish(pieceNo, memberNo);
		} else {
			result2 = mapper.deleteOnlineWish(pieceNo, memberNo);
		}
		
		// 3. INSERT, DELETE 성공 시 해당 게시글의 개수 조회
		int count = 0;
		if(result2 > 0) {
			count = mapper.getWishCount(pieceNo);
		} else {
			return null;
		}
		
		// 4. 좋아요 결과를 Map에 저장해서 반환
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", count); // 위시 개수
		
		if(result == 0 ) map.put("check", "insert");
		else             map.put("check", "delete");
		
		
		System.out.println(map);
		return map;
	}

	// 임시저장작품 불러오기
	@Override
	public Piece getTempPiece(int pieceNo) {
		// TODO Auto-generated method stub
		return mapper.getTempPiece(pieceNo);
	}

	// 임시저장작품 지우기
	// 이전 임시저장작품이 있으면 지우기
	@Override
	public int searchTempiece(Piece piece) {
		int result = mapper.searchTempiece(piece);
		if(result > 0) {
			result = mapper.deleteTemp(piece);
		}
		return result;
	}



}
