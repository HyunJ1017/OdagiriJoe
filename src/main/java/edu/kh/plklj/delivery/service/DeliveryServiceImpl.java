package edu.kh.plklj.delivery.service;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
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
	public List<Manage> deliveryList(int manageNo) {
		return mapper.deliveryList(manageNo);
	}
	

	
//	/* 배송 상태 변경 */
//	@Override
//	public Map<String, Object> updateDelevery(List<Manage> delivery) {
//		Map<String, Object> map = mapper.deliveryIngDateUpdate(delivery);
//		map.put("deleveryEndDateUpdate", mapper.deliveryEndDateUpdate(delivery));
//		map.put("deleveryStatusUpdate", mapper.deliveryStatusUpdate(delivery));
//		return map;
//	}

	@Override
	public List<Manage> deliveryList() {
		return mapper.deliveryList();
	}


}
