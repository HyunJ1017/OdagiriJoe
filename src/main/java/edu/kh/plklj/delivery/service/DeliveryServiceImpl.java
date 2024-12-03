package edu.kh.plklj.delivery.service;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import edu.kh.plklj.delivery.mapper.DeliveryMapper;
import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService{
	private final DeliveryMapper mapper;

	/* 배송 리스트 조회 */
	@Override
	public List<Manage> selectDeliveryList(int memberNo) {
		return mapper.selectDeliveryList(memberNo);
	}

	/* 배송 상태 조회 */
	@Override
	public List<Manage> deliveryList() {
		return mapper.deliveryList();
	}
	
	/* 배송 상태 변경 */
	@Override
	public boolean updateDelivery(List<Manage> delivery) {
	    int result = 0;
			for(Manage manage : delivery) {
				if(manage.getDeliveryIngDate() != null && !manage.getDeliveryIngDate().equals("NaN-NaN-NaN")) result =  mapper.deliveryIngDateUpdate(manage);
				if(manage.getDeliveryEndDate() != null && !manage.getDeliveryEndDate().equals("NaN-NaN-NaN")) result += mapper.deliveryEndDateUpdate(manage);
				result += mapper.deliveryStatusUpdate(manage);
				if(result == 0) return false; // 실패 시
			}
	    return true;
	}
}
