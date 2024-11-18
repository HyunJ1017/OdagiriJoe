package edu.kh.plklj.report.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.report.dto.Report;

@Mapper
public interface ReportMapper {

	int reportInsert(Report report);

}
