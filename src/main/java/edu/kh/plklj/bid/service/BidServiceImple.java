package edu.kh.plklj.bid.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.plklj.bid.dto.BidRequest;
import edu.kh.plklj.bid.dto.BidResponse;
import edu.kh.plklj.bid.mapper.BidMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BidServiceImple implements BidService {

	private final BidMapper bidMapper;

  @Override
  public Double getHighestBid(int pieceNo) {
  	
      Double highestBid = bidMapper.getHighestBid(pieceNo);
      
      return highestBid != null ? highestBid : 0.0;
  }

  @Override
  public BidResponse processBid(BidRequest bidRequest) {
      // 현재 최고 입찰가 확인
      Double currentHighestBid = getHighestBid(bidRequest.getPieceNo());
      if (bidRequest.getBidPrice() <= currentHighestBid) {
          throw new IllegalArgumentException("Bid amount must be higher than the current highest bid.");
      }

      // 입찰 데이터 저장
      bidMapper.saveBid(bidRequest);

      // 최고 입찰가 반환
      return new BidResponse(bidRequest.getPieceNo(), bidRequest.getBidPrice());
  }
}