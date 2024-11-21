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

}
