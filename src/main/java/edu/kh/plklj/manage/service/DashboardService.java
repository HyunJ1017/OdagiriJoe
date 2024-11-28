package edu.kh.plklj.manage.service;

import java.util.Map;

public interface DashboardService {

	void incrementVisitorCount();

	Map<String, Integer> getVisitorCountForLastWeek();

	int getMonthlyTotal();

	

	
}
