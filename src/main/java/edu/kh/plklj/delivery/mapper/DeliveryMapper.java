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

	/** 배송 리스트 최신순 정렬
	 * @return
	 */
	List<Manage> selectDeliveryListOrderByDateDesc();
	
	/** 배송 리스트 오래순 정렬
	 * @return
	 */
	List<Manage> selectDeliveryListOrderByDateAsc();

	/** 일별 날짜 조회 목록
	 * @param date
	 * @return
	 */
	List<Manage> findByDate(String date);

	/** 월별 날짜 조회 목록
	 * @param month
	 * @return
	 */
	List<Manage> findByMonth(String month);

	/** 주별 날짜 조회 목록
	 * @param week
	 * @return
	 */
	List<Manage> findByWeek(String week);

	/** 전체 조회
	 * @return
	 */
	List<Manage> findAll();


}
