package edu.kh.plklj.delivery.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.piece.dto.Piece;
import io.lettuce.core.dynamic.annotation.Param;

@Mapper
public interface DeliveryMapper {

	/** 배송 리스트 조회하기
	 * @return
	 */
	List<Manage> selectDeliveryList(int memberNo);

}
