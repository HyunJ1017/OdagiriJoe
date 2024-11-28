package edu.kh.plklj.manage.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.manage.mapper.ManageMapper;
import edu.kh.plklj.notice.dto.Notice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManageServiceImpl implements ManageService {

	private final ManageMapper mapper;

	@Override
	public Map<String, Object> getSearchList(String code, int cp) {

		int listCount = 0;
		int limit = 0;
		int offset = 0;
		List<Map<String, Object>> resultList = null;
		Pagination pg = null;

		switch (code) {
		case "1":
			listCount = mapper.getArtistListCount(); // 작가 목록 총 개수 가져오기

			limit = 6; // 한 페이지당 보여줄 항목 수
			pg = new Pagination(cp, listCount, limit, 10);

			offset = (cp - 1) * limit; // 페이징 offset 계산

			RowBounds artistBounds = new RowBounds(offset, limit); // RowBounds로 페이징 설정

			resultList = mapper.getArtistList(artistBounds); // 작가 목록 가져오기

			break;

		case "2":
			listCount = mapper.getMemberListCount(); // 회원 목록 총 개수 가져오기

			limit = 6; // 한페이지당 보여줄 항목 수
			pg = new Pagination(cp, listCount, limit, 10);

			offset = (cp - 1) * limit;

			RowBounds memberBounds = new RowBounds(offset, limit);

			resultList = mapper.getMemberList(memberBounds); // 회원 목록 가져오기

			break;

		case "3":

			listCount = mapper.getContentListCount();

			limit = 4;
			pg = new Pagination(cp, listCount, limit, 10);

			offset = (cp - 1) * limit;

			RowBounds contentBounds = new RowBounds(offset, limit);

			resultList = mapper.getContentList(contentBounds);
			break;

		case "4":
			listCount = mapper.getRequestListCount();

			limit = 5;
			pg = new Pagination(cp, listCount, limit, 10);
			offset = (cp - 1) * limit;
			RowBounds requestBounds = new RowBounds(offset, limit);
			resultList = mapper.getRequestList(requestBounds);
			break;

		case "5":
			listCount = mapper.getNoticeListCount();

			limit = 7;
			pg = new Pagination(cp, listCount, limit, 10);
			offset = (cp - 1) * limit;
			RowBounds noticeBounds = new RowBounds(offset, limit);
			resultList = mapper.getNoticeList(noticeBounds);
			System.out.println("공지사항 목록: " + resultList);
			System.out.println("페이지 정보: " + pg);
			break;

		case "6":
			listCount = mapper.getQuestionListCount();

			limit = 7;
			pg = new Pagination(cp, listCount, limit, 10);
			offset = (cp - 1) * limit;
			RowBounds questionBounds = new RowBounds(offset, limit);
			resultList = mapper.getQuestionList(questionBounds);
			break;

		default:
			throw new IllegalArgumentException("Invalid code: " + code);
		}

		Map<String, Object> map = Map.of("resultList", resultList, "pg", pg);

		System.out.println(resultList);

		return map;
	}

	// 회원 정지
	@Override
	public int suspendMember(int memberNo) {

		return mapper.suspendMember(memberNo);
	}

	// 회원 탈퇴
	@Override
	public int withdrawMember(int memberNo) {

		return mapper.withdrawMember(memberNo);
	}

	// 작가 정지
	@Override
	public int suspendAritist(int memberNo) {

		return mapper.suspendAritist(memberNo);
	}

	// 작가 탈퇴
	@Override
	public int withdrawArtist(int memberNo) {

		return mapper.withdrawArtist(memberNo);
	}
	
	@Override
	public int withdrawMember2(int memberNo) {
	
		return mapper.withdrawArtist2(memberNo);
	}
	

	// 상세보기 신고목록 불러오기
	@Override
	public List<Manage> contentsDetailList(int reportNo) {

		return mapper.contentsDetailList(reportNo);
	}

	// 신고내용 삭제
	@Override
	public void deleteReportList(int reportNo) {
		mapper.deleteReportList(reportNo);

	}

	// 게시글 삭제
	@Override
	public void deletePieceList(int pieceNo) {
		mapper.deletePieceList(pieceNo);

	}

	// 승인요청내역 프로필 불러오기
	@Override
	public List<Manage> getprofileList(int memberNo) {

		return mapper.getprofileList(memberNo);
	}

	// 승인 요청 승인
	@Override
	public int getapproveArtist(int memberNo) {
		return mapper.getapproveArtist(memberNo);
	}

	// 승인 요청 거절
	@Override
	public int getrejectArtist(int memberNo) {
		int result = mapper.getrejectArtist2(memberNo);
		result += mapper.getrejectArtist(memberNo);
		return result;

	}

	// 공지사항 작성하기
	@Override
	public int addNoticeList(String noticeTitle, String noticeContent) {
		return mapper.addNoticeList(noticeTitle, noticeContent);

	}

	// 공지사항 삭제하기
	@Override
	public void deleteNoticeList(int noticeNo) {

		mapper.deleteNoticeList(noticeNo);
	}

	// 공지사항 수정페이지 목록 불러오기
	@Override
	public List<Notice> getnoticeList(int noticeNo) {

		return mapper.getnoticeList(noticeNo);
	}

	@Override
	public void updateNotice(String title, String content, int noticeNo) {
		mapper.updateNotice(title, content, noticeNo);

	}
	
	// 1대1문의 삭제하기
	@Override
	public void deleteQuestionList(int questionNo) {
		 mapper.deleteQuestionList(questionNo);
		
	}
	
	// 1대 1문의 답변하기
	@Override
	public void answerList(int questionNo, String questionAnswer) {
		 mapper.answerList(questionNo, questionAnswer);
		
	}
	
}
