package edu.kh.plklj.auction.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.plklj.auction.service.AuctionService;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.piece.dto.Piece;
import edu.kh.plklj.report.dto.Report;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@SessionAttributes({"memberLogin"})
@RequestMapping("auction")
@Slf4j
public class AuctionController {
	
		private final AuctionService service;
		
	
		@GetMapping("main")
		public String auctionMain(
						Model model
				) {
			
			// 진행,예정 리스트 조회
			Map<String, Object> list = service.auctionMain();
			
			model.addAttribute("upCommingList", list.get("upCommingList"));
			model.addAttribute("currentList", list.get("currentList"));
			
			System.out.println(list.get("currentList"));
			
			return "auction/auctionMain";
		}
		
		
		/** 예정 경매 상세 페이지
		 * 
		 */
		@GetMapping("/upCommingDetail")
		public String ongoingDetail(
				 	@RequestParam("pieceNo") int pieceNo,
				  @SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
	        @SessionAttribute(value = "artistLogin", required = false) Member artistLogin,
					Model model
				) {
			
			int loginNo = (memberLogin != null) ? memberLogin.getMemberNo() : (artistLogin != null) ? artistLogin.getMemberNo() : 0;
	    Map<String, Object> pieceDetail = service.ongoingDetail(pieceNo, loginNo);
	    System.out.println(pieceDetail);
	    
	    model.addAttribute("pieceDetail", pieceDetail);
			
			
			
			return "auction/upCommingDetail";
		}
		
		
		/** 위시 리스트 체크 or 해제
		 *  
		 */
		@ResponseBody
		@PostMapping("like")
		public Map<String, Object> pieceLike(
				@RequestBody int pieceNo,
				@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
				@SessionAttribute(value = "artistLogin", required = false) Member artistLogin
				){
			
			 // 로그 출력
	    log.info("pieceNo: {}", pieceNo);
	    log.info("memberLogin: {}", memberLogin);
	    log.info("artistLogin: {}", artistLogin);

	    // 세션 체크
	    if (memberLogin == null && artistLogin == null) {
	        throw new IllegalStateException("로그인이 필요합니다.");
	    }
	    
	    int loginNo = 0;
	    
	    if(memberLogin == null) {
	    	loginNo = artistLogin.getMemberNo();
	    } else {
	    	loginNo = memberLogin.getMemberNo();
	    }
			
			return service.pieceLike(pieceNo, loginNo);
		}
		
		
		/* 신고 팝업 레이어 */
		@GetMapping("upCommingReport")
		public String upCommingReport() {
			return "auction/upCommingReport";
		}
		
		
		/* 경매예정 신고 비동기 처리 */
		@ResponseBody
		@PostMapping("report")
		public ResponseEntity<?> reportInsert(
					@RequestBody Report report,
					@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
					@SessionAttribute(value = "artistLogin", required = false) Member artistLogin
				){
			
			try {
				
				int loginNo = 0;
			    
				if(memberLogin == null) {
					loginNo = artistLogin.getMemberNo();
				} else {
					loginNo = memberLogin.getMemberNo();
				}
			    
			  report.setMemberNo(loginNo);
				
				int result = service.reportInsert(report);

				if(result > 0) {
					return ResponseEntity.ok(result);
				} else {
					return ResponseEntity.badRequest().body("신고 접수에 실패");
				}
			} catch (Exception e) {
				log.error("신고 중 오류 발생", e);
				return ResponseEntity.status(500).body("서버 오류 발생");
			}
			
		}
		
		
		
		
		
		
		/** 진행 경매 작품 상세 조회 페이지
		 * 
		 */
		@GetMapping("currentDetail")
		public String currentDetail(
				 	@RequestParam("pieceNo") int pieceNo,
				  @SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
	        @SessionAttribute(value = "artistLogin", required = false) Member artistLogin,
					Model model
				) {
			
			int loginNo = (memberLogin != null) ? memberLogin.getMemberNo() : (artistLogin != null) ? artistLogin.getMemberNo() : 0;
			
			Piece piece = service.currentDetail(pieceNo);
			System.out.println(piece);
			
			Map<String, Object> pieceDetail = service.ongoingDetail(pieceNo, loginNo);
      // 뷰에 전달
      model.addAttribute("currentDetail", piece);
      model.addAttribute("pieceDetail", pieceDetail);
      
      // 추가: 세션 값 모델에 포함
      model.addAttribute("memberLogin", memberLogin);
      model.addAttribute("artistLogin", artistLogin);
      
      log.info("memberLogin: {}", memberLogin);
      log.info("artistLogin: {}", artistLogin);
      log.info("loginNo: {}", loginNo);
      
			return "auction/currentDetail";
		}
		
		
		
		
		
	
		
		
		
		
		
	 	
	 	
	
}
