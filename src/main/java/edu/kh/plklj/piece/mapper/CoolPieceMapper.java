package edu.kh.plklj.piece.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.piece.dto.AuctionDate;

@Mapper
public interface CoolPieceMapper {

	List<AuctionDate> getAuctionDate();

	int getPieceNo();

}
