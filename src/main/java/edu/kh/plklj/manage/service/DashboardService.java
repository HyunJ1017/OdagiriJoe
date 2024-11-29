package edu.kh.plklj.manage.service;

import java.util.Map;

import edu.kh.plklj.manage.dto.Manage;

public interface DashboardService {


	Map<String, Integer> getVisitorCountForLastWeek();

	int getMonthlyTotal();

	boolean checkAndIncrementVisitor(String clientIp);


	Map<String, Integer> getDailyTrades();

	int getMonthlyTradeTotal();

	

	
}
