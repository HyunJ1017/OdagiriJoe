package edu.kh.plklj.bid.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.bid.dto.BidRequest;

@Mapper
public interface BidMapper {

    // 최고 입찰가 가져오기
    Double getHighestBid(int pieceNo);

    // 입찰 데이터 저장
    void saveBid(BidRequest bidRequest);
}

