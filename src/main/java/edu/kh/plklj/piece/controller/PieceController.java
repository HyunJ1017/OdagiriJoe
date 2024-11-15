package edu.kh.plklj.piece.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.piece.dto.Category;
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
	@GetMapping("online/sales")
	@ResponseBody
	public Map<String, Object> getPiece(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp
			) {
		
		// 판매 작품 데이터 및 페이지네이션 정보
		int salesListCount = service.getsalesPieceCount();
		
		Pagination salesPagination = new Pagination(cp, salesListCount, 10, 5);
		
		List<Piece> salesPiece = 
				service.getSalesPieces(cp, salesListCount, salesPagination);
		
		
		
		
		
		
	// JSON 형태로 두 데이터를 하나의 Map에 담아서 반환
    Map<String, Object> response = new HashMap<>();
    response.put("salesPiece", salesPiece);
    response.put("salesPagination", salesPagination);
    
    
    log.debug("response : {}", response);

    return response;
	}

	@GetMapping("online/completed")
	@ResponseBody
	public Map<String, Object> completed(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp
			) {
	// 완료 작품 데이터 및 페이지네이션 정보
			int completeListCount = service.getCompletePieceCount();
//			log.debug("completeListCount : {}", completeListCount);
			
			Pagination complPagination = new Pagination(cp, completeListCount, 10, 5);
			
			List<Piece> completedPiece = 
					service.getCompletePieces(cp, completeListCount, complPagination);
			
			Map<String, Object> response = new HashMap<>();
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
	public String pieceUpload(Model model) {
		
		List<Category> categoryList = service.getCategoryList();
		model.addAttribute("categoryList", categoryList);
		
		return "online/pieceUpload";
	}
	
	
	/** 작품등록
	 * @param piece : 작품번호, 작가번호, 작품호출경로 등등
	 * @return
	 */
	@PostMapping("upload")
	public String pieceInsert(
			@ModelAttribute Piece piece) {
		
		int result = service.pieceInsert(piece);
		
		if(result > 0) {
			return "redirect:/main";
		} else {
			return "redirect:/piece/upload";
		}
		
	}
	

	
	
	
}
