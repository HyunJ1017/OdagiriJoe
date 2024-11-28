package edu.kh.plklj.manage.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.notice.dto.Notice;

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
	
	// 회원 정지
	int suspendMember(int memberNo);
	
	// 회원 탈퇴
	int withdrawMember(int memberNo);
	
	// 작가 정지
	int suspendAritist(int memberNo);
	
	// 작가 탈퇴
	int withdrawArtist(int memberNo);
	int withdrawArtist2(int memberNo);
	
	// 콘텐츠 관리 상세보기
	List<Map<String, Object>> getContentsDetailList();
	
	// 상세보기 신고목록 불러오기
	List<Manage> contentsDetailList(int reportNo);
	
	// 신고목록 삭제
	void deleteReportList(int reportNo);
	
	// 게시글 삭제
	void deletePieceList(int pieceNo);
	
	// 승인요청내역 프로필 불러오기
	List<Manage> getprofileList(int memberNo);
	
	// 승인요청 승인
	int getapproveArtist(int memberNo);
	
	// 승인 요청 거절
	int getrejectArtist(int memberNo2);
	int getrejectArtist2(int memberNo);
	
	// 공지사항 목록 불러오기
	int getNoticeListCount();
	List<Map<String, Object>> getNoticeList(RowBounds noticeBounds);

	// 공지사항 작성하기 
	int addNoticeList(@Param("noticeTitle") String noticeTitle, @Param("noticeContent") String noticeContent);
	
	// 공지사항 삭제하기
	int deleteNoticeList(int noticeNo);
	
	// 공지사항 수정 페이지 목록 불러오기
	
	List<Notice> getnoticeList(int noticeNo);
	
	int updateNotice(@Param("title") String title, @Param("content") String content, @Param("noticeNo") int noticeNo);
	
	// 1대 1문의 
	int getQuestionListCount();
	List<Map<String, Object>> getQuestionList(RowBounds questionBounds);

	// 1대 1문의 삭제하기
	void deleteQuestionList(int questionNo);
	
	// 1대 1문의 답변하기
	void answerList(@Param("questionNo") int questionNo, @Param("questionAnswer") String questionAnswer);



	

	


	



	



}