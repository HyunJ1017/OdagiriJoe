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


}
