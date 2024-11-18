package edu.kh.plklj.manage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import java.util.Map;

@Mapper
public interface ManageMapper {

	// 작가 목록 

	int getArtistListCount();
	List<Map<String, Object>> getArtistList(RowBounds artistBounds);
	
	// 콘텐츠 관리
	int getContentListCount();
	List<Map<String, Object>> getContentList(RowBounds bounds);



	



}