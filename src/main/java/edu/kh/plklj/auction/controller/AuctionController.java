package edu.kh.plklj.auction.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.auction.service.AuctionService;
import edu.kh.plklj.common.scheduling.scheduler.AuctionScheduler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("auction")
@Slf4j
public class AuctionController {
	
		private final AuctionService service;
		
		private final AuctionScheduler auctionScheduler;
	
	
		@GetMapping("main")
		public String auctionMain(
						Model model
				) {
			
			
			// 진행,예정 리스트 조회
			Map<String, Object> list = service.auctionMain();
			
			model.addAttribute("upCommingList", list.get("upCommingList"));
			
			
			return "auction/auctionMain";
		}
		
		
		
		/** 진행 경매 작품 상세 조회 페이지
		 * 
		 */
		@GetMapping("currentDetail")
		public String auctionDetail() {
			return "auction/currentDetail";
		}
		
		
		
		/** 예정 경매 상세 페이지
		 * 
		 */
	 	@GetMapping("/upCommingDetail")
    public String ongoingDetail(
        @RequestParam("pieceNo") int pieceNo,
        Model model
    ) {
        // pieceNo로 상세 데이터 조회
			 	Map<String, Object> pieceDetail = service.ongoingDetail(pieceNo);
			 	System.out.println(pieceDetail);
		    
		    // 모델에 데이터 추가
		    model.addAttribute("pieceDetail", pieceDetail);

	        // 상세 페이지 반환
        return "auction/upCommingDetail";
    }
	 	
	 	
	
}
