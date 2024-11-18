package edu.kh.plklj.common.scheduling.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.plklj.common.scheduling.mapper.ScheduleMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
	
	private final ScheduleMapper mapper;
	
	// 오늘자 시작 경매 업데이트
	@Override
	public int auctionStartScheduling() {
		return mapper.auctionStart();
	}
	
	// 오늘자 종료 경매 업데이트(낙찰품)
	@Override
	public int successfulAuction() {
		
		List<Integer> list = mapper.serchAuction();
		int count = 0;
		
		if(list.size() > 0) {
			for(int pieceNo : list) {
				int result = mapper.successfulAuction(pieceNo);
				if(result > 0) count++;
			}
		}
		
		return count;
	}
	
	// 오늘자 종료 경매 업데이트(유찰품)
	@Override
	public int failAuction() {
		
		List<Integer> list = mapper.serchAuction2();
		int count = 0;
		
		if(list.size() > 0) {
			for(int pieceNo : list) {
				int result = mapper.failAuction(pieceNo);
				result = mapper.cellPice(pieceNo);
				if(result > 0) count++;
			}
		}
		
		return count;
	}
}
