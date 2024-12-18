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

	/** 배송 조회하기
	 * @param manageNo
	 * @return
	 */
	List<Manage> deliveryList();
	
	/** 배송 예정일 수정하기
	 * @param memberNo
	 * @return
	 */
	int deliveryIngDateUpdate(Manage manage);

	/** 배송 완료일 수정하기
	 * @param memberNo
	 * @return
	 */
	int deliveryEndDateUpdate(Manage manage);

	/** 배송 상태 변경하기
	 * @param memberNo
	 * @return
	 */
	int deliveryStatusUpdate(Manage manage);

}
