package edu.kh.plklj.delivery.service;

import java.util.Map;

public interface DeliveryService {

	/** 배송 리스트 조회
	 * @return
	 */
	Map<String, Object> selectDeliveryList();

}
