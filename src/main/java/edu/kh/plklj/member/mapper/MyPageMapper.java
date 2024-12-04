package edu.kh.plklj.member.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.dto.SellInfo;
import edu.kh.plklj.notice.dto.Notice;
import edu.kh.plklj.piece.dto.Piece;

@Mapper
public interface MyPageMapper {

	int updateName(Member member);

	Member getMember(String memberNo);

	int updatePhone(Member member);

	List<BankCode> getBankList();

	int checkNickname(String inputNickname);

	int insertArtist(Member artist);
	
	int insertWork(@Param("memberNo") int memberNo, @Param("workDetail") String workDetails);
	
	int updateArtist(Member artist);

	int deleteWork(int memberNo);

	int insertQuestion(Notice question);

	int getQuestionListCount(int memberNo);

	List<Notice> getCategoryList();

	List<Notice> getQuestionList(int memberNo, RowBounds rowBounds);

	int deleteQuestion(int questionNo);

	List<Member> getFollowList(int memberNo, RowBounds rowBounds);

	List<Piece> getWishList(int memberNo, RowBounds rowBounds);

	int getFollowListCount(int memberNo);

	int getWishListCount(int memberNo);

	List<Piece> artistAuction(int memberNo);

	List<Piece> getBuyList(int memberNo);

	List<Piece> getAuctionList(int memberNo);

	String getEndprice(int pieceNo);

	int updateNickname(Member member);

	Member getArtistBank(int memberNo);

	int setArtistBank(Member member);

	int setArtistProfile(Member artist);

	Member getArtistInfo(int memberNo);

	List<SellInfo> getSellList(@Param("memberNo") int memberNo, @Param("selectedMonth") String selectedMonth);

	String getSellAmount(int memberNo);

	int getPurchasesCount(int memberNo);

	List<Piece> getPurchaseList(int memberNo, RowBounds rowBounds);

	int deleteMember(int memberNo);

}
