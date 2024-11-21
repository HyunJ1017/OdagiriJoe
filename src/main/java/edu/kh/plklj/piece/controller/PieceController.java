package edu.kh.plklj.piece.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.piece.dto.Category;
import edu.kh.plklj.piece.dto.Piece;
import edu.kh.plklj.piece.service.PieceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("piece")
@Slf4j
@SessionAttributes({"memberLogin"})
public class PieceController {
	private final PieceService service;
	
	/** 온라인 갤러리 조회 페이지 이동
	 * @return
	 */
	@GetMapping("gallery")
	public String onlineGallery(
			
			) {
		return "online/onlineList";
	}
	
	
	/** 판매 작품 목록 조회
	 * @return
	 */
	@GetMapping("online/sales")
	@ResponseBody
	public Map<String, Object> getPiece(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "sort", required = false, defaultValue = "recent") String sort,
			@RequestParam(value = "order", required = false, defaultValue = "asc") String order
			) {
		
		// 판매 작품 데이터 및 페이지네이션 정보
		int salesListCount = service.getsalesPieceCount();
		Pagination salesPagination = new Pagination(cp, salesListCount, 10, 5);
		
		// 판매 작품 목록 조회
		List<Piece> salesPiece = 
				service.getSalesPieces(cp, salesListCount, salesPagination, sort, order);
		
		// JSON 형태로 두 데이터를 하나의 Map에 담아서 반환
		Map<String, Object> response = new HashMap<>();
		response.put("salesPiece", salesPiece);
		response.put("salesPagination", salesPagination);
		
		
		log.debug("Sort: {}, Order: {}", sort, order);
		
		return response;
	}
		
	/** 완료 작품 목록 조회
	 * @param cp
	 * @return
	 */
	@GetMapping("online/completed")
	@ResponseBody
	public Map<String, Object> completed(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "sort", required = false, defaultValue = "recent") String sort,
			@RequestParam(value = "order", required = false, defaultValue = "asc") String order
			) {
		// 완료 작품 데이터 및 페이지네이션 정보
		int completeListCount = service.getCompletePieceCount();
//			log.debug("completeListCount : {}", completeListCount);
		
		Pagination complPagination = new Pagination(cp, completeListCount, 10, 5);
		
		List<Piece> completedPiece = 
				service.getCompletePieces(cp, completeListCount, complPagination, sort, order);
		
		Map<String, Object> response = new HashMap<>();
		response.put("completedPiece", completedPiece);
		response.put("complPagination", complPagination);
		
		return response;
	}
		
		
	/** 온라인 갤러리 상세 조회 페이지
	 *
	 */
	@GetMapping("onlineDetail")
	public String onlineDetail(
			@RequestParam("pieceNo") int pieceNo,
			Model model,
			@SessionAttribute(name = "memberLogin", required = false) Member loginMember,
      @SessionAttribute(name = "artistLogin", required = false) Member loginArtist
			) {
		
		
		
		Map<String, Integer> map = new HashMap<>();
		map.put("pieceNo", pieceNo);
		
		if (loginMember != null) {
			map.put("memberNo", loginMember.getMemberNo());
		} else if (loginArtist != null) {
			map.put("memberNo", loginArtist.getMemberNo());
		}
		
		Piece piece = service.getPieceDetail(map);
		
		// 가져온 작품 정보를 모델에 추가
		model.addAttribute("piece", piece);
		
		return "online/onlineDetail";
	}
	
	
	/** 작품 등록 페이지 이동
	 * 
	 */
	@GetMapping("upload")
	public String pieceUpload(
			@RequestParam(value = "pieceNo", required = false, defaultValue = "0") int pieceNo,
			Model model) {
		
		if(pieceNo != 0) {
			Piece tempPiece = service.getTempPiece(pieceNo);
			model.addAttribute("tempPiece", tempPiece);
		}
		
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

		// 이전 임시저장작품이 있으면 지우기
		int result = service.searchTempiece(piece);
		
		result = service.pieceInsert(piece);
		
		if(result > 0) {
			return "redirect:/main";
		} else {
			return "redirect:/piece/upload";
		}
	}
		
    
	/** 위시 리스트 체크 or 해제
	 */
	@ResponseBody
	@PostMapping("wish")
	public Map<String, Object> onlineWish(
			@RequestBody int pieceNo,
			 @SessionAttribute(name = "memberLogin", required = false) Member loginMember,
       @SessionAttribute(name = "artistLogin", required = false) Member loginArtist
			){
		
		
		int memberNo = 0;
		
		if(loginMember == null ) {
			memberNo = loginArtist.getMemberNo();
		} else {
			memberNo = loginMember.getMemberNo();
		}
		
//		int memberNo = loginMember.getMemberNo();
		
		return service.onlineWish(pieceNo, memberNo);
	}
	
	/** 구매하기 팝업 창 열기
	 */
	@GetMapping("purchasePopup")
	public String purchasePopup(
			@RequestParam("pieceNo") int pieceNo,
			Model model) {
		
		Piece piece = service.getPieceDetail(pieceNo);
		model.addAttribute("piece", piece);
		return "online/purchasePopup";
	}
    
	

	/** 작품 임시저장
	 * @param piece
	 * @return
	 */
	@PostMapping("saveTemp")
	public String saveTemp(
			@ModelAttribute Piece piece) {
		
		// 이전 임시저장작품이 있으면 지우기
		int result = service.searchTempiece(piece);
		
		result = service.saveTemp(piece);
		
		if(result > 0) {
			return "redirect:/";
		} else {
			return "redirect:/";
		}
	}
	
	@GetMapping("removeTemp")
	public String getMethodName(
			@RequestParam("pieceNo") int pieceNo) {
		
		Piece piece = Piece.builder().pieceNo(pieceNo).build();
		
		int result = service.searchTempiece(piece);
		
		if(result > 0) {
			return "redirect:/member/MyPage/artistAuction";
		}
		return "redirect:/member/MyPage/artistAuction";
	}
	
	
	
}
