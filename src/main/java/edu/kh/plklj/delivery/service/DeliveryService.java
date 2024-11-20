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

	/** 배송 리스트 최신순 정렬
	 * @return
	 */
	List<Manage> getDeliveryListOrderByDateDesc();

	/** 배송 리스트 오래된순 정렬
	 * @return
	 */
	List<Manage> getDeliveryListOrderByDateAsc();


	/** 일, 주, 월별 날짜 조회 목록
	 * @param month
	 * @param week
	 * @param date
	 * @return
	 */
	List<Manage> filterDeliveriesByDate(String month, String week, String date);



}
