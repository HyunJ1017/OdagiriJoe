package edu.kh.plklj.manage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import java.util.Map;

@Mapper
public interface ManageMapper {


	int getContentListCount();
	
	List<Map<String, Object>> getContentList(RowBounds bounds);

	



}
