package edu.kh.plklj.member.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.notice.dto.Notice;
import edu.kh.plklj.piece.dto.Piece;

public interface MyPageService {

	// 이름수정
	int updateName(Member member);

	// 비밀번호 변경
	int updatePw(Map<String, String> map);

	// 전화번호 변경
	int updatePhone(Member member);

	// 은행리스트보내주기
	List<BankCode> getBankList();

	// 닉네임 중복검사
	int checkNickname(String inputNickname);

	// 작가 등록
	int insertArtist(Member artist, MultipartFile inputArtistPortfolio, List<String> workDetails);

	// 1:1 문의사항 등록
	int insertQuestion(Notice question);

	// 1:1문의내역, 문의카테고리, 페이지네이션 얻어오기
	Map<String, Object> onequestion(int memberNo, int currentPage);

	// 1:1 문의사항 삭제
	int deleteQuestion(int questionNo);

	// 팔로우, 위시리스트 얻어오기
	Map<String, Object> followAndWish(int memberNo);

	// 작가 경매 물품 조회하기
	List<Piece> artistAuction(int memberNo);
	

}
