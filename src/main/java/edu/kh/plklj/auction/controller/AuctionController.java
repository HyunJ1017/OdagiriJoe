package edu.kh.plklj.auction.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.plklj.auction.service.AuctionService;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
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
			  System.out.println("pieceDetail: " + pieceDetail);
		    
		    // 데이터가 없을 경우 예외 처리
		    if (pieceDetail == null || pieceDetail.isEmpty()) {
		        throw new RuntimeException("해당 작품 정보를 찾을 수 없습니다. pieceNo: " + pieceNo);
		    }

		    // 모델에 데이터 추가
		    model.addAttribute("pieceDetail", pieceDetail);

	        // 상세 페이지 반환
        return "auction/upCommingDetail";
    }
	
}
