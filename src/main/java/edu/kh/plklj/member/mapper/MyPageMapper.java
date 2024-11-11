package edu.kh.plklj.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.main.dto.Member;

@Mapper
public interface MyPageMapper {

	int updateName(Member member);

}
