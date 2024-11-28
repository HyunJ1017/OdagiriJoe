package edu.kh.plklj.manage.service;


import java.util.List;
import java.util.Map;

import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.notice.dto.Notice;

public interface ManageService {



	// 콘텐츠 관리
	Map<String, Object> getSearchList(String code, int cp);

	// 회원 정지
	int suspendMember(int memberNo);

	// 회원 탈퇴
	int withdrawMember(int memberNo);

	// 작가 정지
	int suspendAritist(int memberNo);

	// 작가 탈퇴
	int withdrawArtist(int memberNo);
	int withdrawMember2(int memberNo);

	// 신고내용 불러오기
	List<Manage> contentsDetailList(int reportNo);

	// 신고내용 삭제
	void deleteReportList(int reportNo);

	// 게시글 삭제
	void deletePieceList(int pieceNo);

	// 승인요청내역 프로필 불러오기
	List<Manage> getprofileList(int memberNo);

	// 승인요청 승인
	int getapproveArtist(int memberNo);

	// 승인요청 거절
	int getrejectArtist(int memberNo);

	// 공지사항 작성하기
	int addNoticeList(String noticeTitle, String noticeContent);

	// 공지사항 삭제하기
	void deleteNoticeList(int noticeNo);



	// 공지사항 수정페이지 목록 불러오기
	List<Notice> getnoticeList(int noticeNo);

	void updateNotice(String title, String content, int noticeNo);

	// 1대 1문의 삭제하기
	void deleteQuestionList(int questionNo);

	// 1대 1문의 답변하기
	void answerList(int questionNo, String questionAnswer);

	




}
