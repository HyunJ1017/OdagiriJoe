package edu.kh.plklj.sms.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.main.dto.Member;

@Mapper
public interface SmsMapper {

	List<String> getIdList(String phoneNumber);

	Member getSmsMember(int memberNo);

}
