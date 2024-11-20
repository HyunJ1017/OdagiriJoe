package edu.kh.plklj.manage.service;


import java.util.List;
import java.util.Map;

import edu.kh.plklj.manage.dto.Manage;

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

	// 신고내용 불러오기
	List<Manage> contentsDetailList(int reportNo);

	// 신고내용 삭제
	void deleteReportList(int reportNo);

	// 게시글 삭제
	void deletePieceList(int pieceNo);


}
