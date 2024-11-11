package edu.kh.plklj.member.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.plklj.main.dto.Member;

@Mapper
public interface LogInMapper {

	Member signUp(String memberId);

	int searchIdPh(@Param("inputPhone") String inputPhone, @Param("inputId") String inputId);

	int changePw(Member member);


}
