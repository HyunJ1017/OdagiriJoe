package edu.kh.plklj.piece.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.plklj.piece.dto.AuctionDate;
import edu.kh.plklj.piece.mapper.CoolPieceMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CoolPieceServiceImpl implements CoolPieceService{
	
	private final CoolPieceMapper mapper;

	// 경매 불가날자 반환
	@Override
	public List<String> getAuctionDate() {
		
		List<String> result = new ArrayList<>();
		List<AuctionDate> dateList = mapper.getAuctionDate();
		log.info("dateList : {}", dateList);
		
		for(AuctionDate date : dateList) {
			if(date.getDataCount() > 2) {
				result.add(date.getDate());
			}
		}
		
		return result;
	}
	
	// 작품번호 불러오기
	@Override
	public int getPieceNo() {
		return mapper.getPieceNo();
	}

}
