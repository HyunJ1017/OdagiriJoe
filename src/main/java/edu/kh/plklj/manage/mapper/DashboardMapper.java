package edu.kh.plklj.manage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.manage.dto.Manage;

@Mapper
public interface DashboardMapper {

	int incrementVisitorCountForToday(String clientIp);

	List<Manage> getVisitorCountForLastWeek();

	int getMonthlyTotal();

	
	List<Manage> getDailyTrades();

	int getMonthlyTradeTotal();

	List<Manage> getDailyArtworks();

	int getMonthlyArtworkTotal();


	
}
