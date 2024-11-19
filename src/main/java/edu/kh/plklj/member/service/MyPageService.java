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

	// 작가 활동명 수정하기
	int updateNickname(Member member);
	
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

	/** 리스트최신화용
	 * @param map { "memberNo" : memberNo, "listType" : listType, "cp" : cp }
	 * @return { "listType" : listType, "getList" : getList, "getPagination" : getPagination }
	 */
	Map<String, Object> paginationCall(Map<String, String> map);

	// 낙찰했는데 아직 입금안한 경매품
	List<Piece> getBuyList(int memberNo);

	// 오늘것중 입찰한 경매품
	List<Piece> getAuctionList(int memberNo);

	// 현재입찰가 얻어오기
	int getEndprice(int pieceNo);

	// 작가 은행코드, 은행이름, 계좌번호 얻어오기
	Member getArtistBank(int memberNo);

	// 작가 계좌번호 변경
	int setArtistBank(Member member);

	// 작가 프로필사진 요청url 변경
	int setArtistProfile(Member artist);

	// 이전 신청내역 불러오기
	Member getArtistInfo(int memberNo);

	// 작가 월별 판매작 및 총액
	Map<String, Object> getSalesConfirmation(int memberNo, String selectedMonth);

	

}
