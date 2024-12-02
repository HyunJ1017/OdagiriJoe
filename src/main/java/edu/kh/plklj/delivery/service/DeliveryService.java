package edu.kh.plklj.delivery.service;

import java.util.List;
import java.util.Map;

import edu.kh.plklj.manage.dto.Manage;

public interface DeliveryService {

	/** 배송 리스트 조회
	 * @param memberNo 
	 * @return
	 */
	List<Manage> selectDeliveryList(int memberNo);

	/** 배송 상태 변경
	 * @param manageNo
	 * @param cp
	 * @return
	 */
	List<Manage> deliveryList(int cp);

	
	/** 배송 상태 변경
	 * @param memberNo
	 * @return
	 */
	boolean updateDelivery(List<Manage> delivery);
}
