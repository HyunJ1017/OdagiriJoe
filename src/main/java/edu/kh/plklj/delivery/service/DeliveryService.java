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

	List<Manage> deliveryList();
	
	
	/** 배송 상태 변경
	 * @param manageNo
	 * @return
	 */
	List<Manage> deliveryList(int manageNo);

	
	/** 배송 상태 변경
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> updateDelevery(List<Manage> delivery);



}
