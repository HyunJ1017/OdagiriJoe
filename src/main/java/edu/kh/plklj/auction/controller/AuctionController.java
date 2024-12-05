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
			
			System.out.println(list.get("upCommingList"));
			
			return "auction/auctionMain";
		}
		
		
		// 날짜 확인 하여 현재,예정 상세페이지
		@GetMapping("/auctionDetail")
		public String auctionDetail(
		    @RequestParam("pieceNo") int pieceNo,
		    @SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
		    @SessionAttribute(value = "artistLogin", required = false) Member artistLogin,
		    Model model
		) {
		    // 로그인 정보 확인
		    int loginNo = (memberLogin != null) ? memberLogin.getMemberNo() : (artistLogin != null) ? artistLogin.getMemberNo() : 0;

		    // 작품 상세 정보 조회
		    Map<String, Object> pieceDetail = service.upComiingDetail(pieceNo, loginNo);

		    // 작품 상태 확인
		    String pieceStatus = (String) pieceDetail.get("pieceStatus"); 
		    
		    // 모델에 데이터 추가
		    model.addAttribute("currentDetail", service.currentDetail(pieceNo));
		    model.addAttribute("pieceDetail", pieceDetail);
		    model.addAttribute("memberLogin", memberLogin);
		    model.addAttribute("artistLogin", artistLogin);

		    // 상태코드에 따라 페이지 이동
		    if ("A".equals(pieceStatus)) {
		        // 상태코드가 'A'면 예정 경매 페이지로 이동
		        return "auction/upCommingDetail";
		    } else {
		        // 아니면 상태코드에 맞게 상세페이지
		        return "auction/currentDetail";
		    } 
		}

		
		
		/** 진행 경매 작품 상세 조회 페이지
		 * 
		 */
//		@GetMapping("currentDetail")
//		public String currentDetail(
//				 	@RequestParam("pieceNo") int pieceNo,
//				  @SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
//	        @SessionAttribute(value = "artistLogin", required = false) Member artistLogin,
//					Model model
//				) {
//			
//			int loginNo = (memberLogin != null) ? memberLogin.getMemberNo() : (artistLogin != null) ? artistLogin.getMemberNo() : 0;
//			
//			Piece piece = service.currentDetail(pieceNo);
//			System.out.println(piece);
//			
//			Map<String, Object> pieceDetail = service.upComiingDetail(pieceNo, loginNo);
//      // 뷰에 전달
//      model.addAttribute("currentDetail", piece);
//      model.addAttribute("pieceDetail", pieceDetail);
//      
//      System.out.println(piece);
//      
//      // 추가: 세션 값 모델에 포함
//      model.addAttribute("memberLogin", memberLogin);
//      model.addAttribute("artistLogin", artistLogin);
//
//      
//      log.info("memberLogin: {}", memberLogin);
//      log.info("artistLogin: {}", artistLogin);
//      log.info("loginNo: {}", loginNo);
//      
//			return "auction/currentDetail";
//		}
		
		
		
		
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
		
		
		
		
		/* 종료 경매 */
		@GetMapping("completedList")
		@ResponseBody
		public Map<String, Object> getCompletedList(
				@RequestParam(value = "cp", required = false,	defaultValue = "1") int cp
				) {
			
	    Map<String, Object> map = service.completedList(cp);
	    
	    return map;
		}
		
		
		
		
		
	
		
		
		
		
		
	 	
	 	
	
}
