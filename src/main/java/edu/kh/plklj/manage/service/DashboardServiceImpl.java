package edu.kh.plklj.manage.service;


import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.manage.mapper.DashboardMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
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

		int updateedRows = mapper.incrementVisitorCountForToday(clientIp);
		return updateedRows > 0;
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














}
