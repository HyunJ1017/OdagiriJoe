package edu.kh.plklj.piece.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.piece.dto.Piece;
import edu.kh.plklj.piece.service.PieceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("piece")
@Slf4j
public class PieceController {
	private final PieceService service;
	
	
	@GetMapping("gallery")
	public String onlineGallery() {
		return "online/onlineList";
	}
	
	
	/** 온라인 갤러리 조회 페이지 이동
	 * @return
	 */
	@GetMapping("online")
	@ResponseBody
	public Map<String, Object> getPiece(
			@RequestParam(value = "page", defaultValue = "1") int page
			) {
		
		// 판매 작품 데이터 및 페이지네이션 정보
		int salesListCount = service.getsalesPieceCount();
		Pagination salesPagination = new Pagination(page, salesListCount);
		List<Piece> salesPiece = 
				service.getSalesPieces(salesPagination.getCurrentPage(), 
						                   salesPagination.getLimit());
		
		// 완료 작품 데이터 및 페이지네이션 정보
		int completeListCount = service.getCompletePieceCount();
		Pagination complPagination = new Pagination(page, completeListCount);
		
		List<Piece> completedPiece = 
				service.getCompletePieces(complPagination.getCurrentPage(), 
						                      complPagination.getLimit());
		
	// JSON 형태로 두 데이터를 하나의 Map에 담아서 반환
    Map<String, Object> response = new HashMap<>();
    response.put("salesPiece", salesPiece);
    response.put("salesPagination", salesPagination);
    response.put("completedPiece", completedPiece);
    response.put("complPagination", complPagination);

    return response;
		

		
	}
	
	/** 온라인 갤러리 상세 조회 페이지
	 *
	 */
	@GetMapping("onlineDetail")
	public String onlineDetail() {
		return "online/onlineDetail";
	}
	
	
	/** 작품 등록 페이지 이동
	 * 
	 */
	@GetMapping("upload")
	public String pieceUpload() {
		return "online/pieceUpload";
	}
	
	
	
	

	
	
	
}
