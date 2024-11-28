package edu.kh.plklj.manage.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.manage.dto.Manage;

@Mapper
public interface DashboardMapper {

	void incrementVisitorCountForToday();

	List<Manage> getVisitorCountForLastWeek();

	int getMonthlyTotal();

}
