//package edu.kh.plklj.bid.service;
//
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import edu.kh.plklj.bid.mapper.BidMapper;
//import lombok.RequiredArgsConstructor;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class BidServiceImple implements BidService{
//	
//   private final BidMapper mapper;
//
//   @Override
//   public void processBid(int pieceNo, int memberNo, double bidPrice) {
//	  	 mapper.insertBid(pieceNo, memberNo, bidPrice);
//	  	 mapper.updateCurrentBidPrice(pieceNo, bidPrice);
//   }
//
//   @Override
//   public double getCurrentBidPrice(int pieceNo) {
//       return mapper.selectCurrentBidPrice(pieceNo);
//   }
//}
