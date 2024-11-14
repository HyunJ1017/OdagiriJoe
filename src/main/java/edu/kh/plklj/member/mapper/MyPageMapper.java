package edu.kh.plklj.member.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.notice.dto.Notice;
import edu.kh.plklj.piece.dto.Piece;

@Mapper
public interface MyPageMapper {

	int updateName(Member member);

	Member getMember(String string);

	int updatePhone(Member member);

	List<BankCode> getBankList();

	int checkNickname(String inputNickname);

	int insertArtist(Member artist);

	int insertQuestion(Notice question);

	int getQuestionListCount(int memberNo);

	List<Notice> getCategoryList();

	List<Notice> getQuestionList(int memberNo, RowBounds rowBounds);

	int deleteQuestion(int questionNo);

	List<Member> getFollowList(int memberNo, RowBounds rowBounds);

	List<Piece> getWishList(int memberNo, RowBounds rowBounds);

	int getFollowListCount(int memberNo);

	int getWishListCount(int memberNo);

}
