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
	
	// 회원 목록
	int getMemberListCount();
	List<Map<String, Object>> getMemberList(RowBounds memberBounds);

	
	// 콘텐츠 관리
	int getContentListCount();
	List<Map<String, Object>> getContentList(RowBounds bounds);
	
	// 작가 승인 요청
	int getRequestListCount();
	List<Map<String, Object>> getRequestList(RowBounds requestBounds);
	



	



}