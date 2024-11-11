package edu.kh.plklj.sms.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SmsMapper {

	List<String> getIdList(String phoneNumber);

}
