package edu.kh.plklj.common.scheduling.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScheduleMapper {

	int auctionStart();

	List<Integer> serchAuction();

	int successfulAuction(int pieceNo);

	List<Integer> serchAuction2();

	int failAuction(int pieceNo);

	int cellPice(int pieceNo);

}
