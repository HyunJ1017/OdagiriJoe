package edu.kh.plklj.member.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;

@Mapper
public interface MyPageMapper {

	int updateName(Member member);

	Member getMember(String string);

	int updatePhone(Member member);

	List<BankCode> getBankList();

	int checkNickname(String inputNickname);

	int insertArtist(Member artist);

}
