package edu.kh.plklj.manage.service;


import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.manage.mapper.DashboardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class DashboardServiceImpl implements DashboardService {
	
	private final DashboardMapper mapper;
	
	
	
	@Override
	public Map<String, Integer> getVisitorCountForLastWeek() {
		
		List<Manage> data = mapper.getVisitorCountForLastWeek();
		
		Map<String, Integer> visitorData = new LinkedHashMap<>();
		for(Manage visits : data) {
			visitorData.put(visits.getVisitorDate(), visits.getVisitCount());
		}
		
		return visitorData;
	}
	
	@Override
	public int getMonthlyTotal() {
		return mapper.getMonthlyTotal();
	}
	
	@Override
	public boolean checkAndIncrementVisitor(String clientIp) {

		try {
      int result = mapper.incrementVisitorCountForToday(clientIp);
      return result > 0;
  } catch (DuplicateKeyException e) {
      // 이미 존재하는 경우, 에러를 무시하고 처리
      return false;
  }
	}
	
	@Override
	public Map<String, Integer> getDailyTrades() {
		
		List<Manage> dailyTrades = mapper.getDailyTrades();
		
		Map<String, Integer> tradeData = new LinkedHashMap<>();
		for (Manage trade : dailyTrades) {
			tradeData.put(trade.getPayDate(), trade.getPayAmount());
		}
		
		
		return tradeData;
	}
	

	
	@Override
	public int getMonthlyTradeTotal() {
		return mapper.getMonthlyTradeTotal();
	}
	
	
	
	@Override
	public Map<String, Integer> getDailyArtworks() {
		
		List<Manage> dailyArtworks = mapper.getDailyArtworks();
		
		Map<String, Integer> artworkData = new LinkedHashMap<>();
		for (Manage artwork : dailyArtworks) {
			artworkData.put(artwork.getRegDate(), artwork.getPieceCount());
		}
		
		return artworkData;
	}
	
	
	@Override
	public int getMonthlyArtworkTotal() {
		return mapper.getMonthlyArtworkTotal();
	}














}
