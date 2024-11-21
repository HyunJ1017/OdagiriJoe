package edu.kh.plklj.bid.service;

import edu.kh.plklj.bid.dto.BidRequest;
import edu.kh.plklj.bid.dto.BidResponse;

public interface BidService {
	
  BidResponse processBid(BidRequest bidRequest);

	Double getHighestBid(int pieceNo);
}

