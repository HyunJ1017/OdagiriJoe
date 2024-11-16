package edu.kh.plklj.auction.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("auction")
@Slf4j
public class AuctionController {
	
	
		@GetMapping("main")
		public String auctionMain() {
			return "auction/auctionMain";
		}
		
		// 메인페이지 이미지 조회
	
		
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
		@GetMapping("ongoingDetail")
		public String ongoingDetail() {
			return "auction/ongoingDetail";
		}
		
}
