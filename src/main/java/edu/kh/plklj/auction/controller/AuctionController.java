package edu.kh.plklj.auction.controller;

import java.util.Map;

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
			
			 // 세션이 없는 경우 처리
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
		
		
		
		
		
		
		/** 진행 경매 작품 상세 조회 페이지
		 * 
		 */
		@GetMapping("currentDetail")
		public String auctionDetail() {
			return "auction/currentDetail";
		}
		
		
		
		
		
		
	 	
	 	
	
}
