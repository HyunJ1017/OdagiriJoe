package edu.kh.plklj.bid.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.plklj.bid.dto.BidResponse;
import edu.kh.plklj.bid.service.BidService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bid")
@RequiredArgsConstructor
public class BidController {

	private final BidService bidService;

  // 현재 최고 입찰 데이터를 반환
  @GetMapping("/current")
  public BidResponse getCurrentBid(@RequestParam("pieceNo") int pieceNo) {
      // 최고 입찰 금액 조회
      Double currentHighestBid = bidService.getHighestBid(pieceNo);
      if (currentHighestBid == null) {
          currentHighestBid = 0.0; // 입찰이 없을 경우 기본값
      }

      return new BidResponse(pieceNo, currentHighestBid); // JSON 응답
  }
}
