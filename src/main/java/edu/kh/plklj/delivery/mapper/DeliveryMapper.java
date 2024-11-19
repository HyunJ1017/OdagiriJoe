package edu.kh.plklj.delivery.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.piece.dto.Piece;

@Mapper
public interface DeliveryMapper {

	/** 배송 리스트 조회하기
	 * @return
	 */
	List<Manage> selectDeliveryList();

}
