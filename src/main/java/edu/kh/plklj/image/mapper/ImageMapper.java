package edu.kh.plklj.image.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ImageMapper {

	List<String> selectFileUrlList();

}
