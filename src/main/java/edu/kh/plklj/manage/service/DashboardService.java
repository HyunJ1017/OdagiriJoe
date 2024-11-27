package edu.kh.plklj.manage.service;

import java.util.Map;

public interface DashboardService {

	

	void incremrntVisitorCount();

	Map<String, Integer> getVisitorCountForLastWeek();

}
