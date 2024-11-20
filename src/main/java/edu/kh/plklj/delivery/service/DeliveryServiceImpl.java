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

	/* 배송 리스트 최신순 정렬 */
	@Override
	public List<Manage> getDeliveryListOrderByDateAsc() {
	    return mapper.selectDeliveryListOrderByDateAsc();
	}

	/* 배송 리스트 오래순 정렬 */
	@Override
	public List<Manage> getDeliveryListOrderByDateDesc() {
	    return mapper.selectDeliveryListOrderByDateDesc();
	}
	
	/* 일, 주, 월별 조회 목록 */
	@Override
	public List<Manage> filterDeliveriesByDate(String month, String week, String date) {
	    // 날짜 형식 유효성 검증 (예: yyyy-MM-dd 형식 검사)
	    if (date != null && !isValidDateFormat(date, "yyyy-MM-dd")) {
	        throw new IllegalArgumentException("유효하지 않은 날짜 형식입니다: " + date);
	    }

	    if (week != null && !isValidDateFormat(week, "yyyy-'W'ww")) {
	        throw new IllegalArgumentException("유효하지 않은 주 형식입니다: " + week);
	    }

	    if (month != null && !isValidDateFormat(month, "yyyy-MM")) {
	        throw new IllegalArgumentException("유효하지 않은 월 형식입니다: " + month);
	    }

	    if (date != null) {
	        return mapper.findByDate(date);
	    } else if (month != null) {
	        return mapper.findByMonth(month);
	    } else if (week != null) {
	        return mapper.findByWeek(week);
	    } else {
	        return mapper.findAll(); // 기본값: 전체 조회
	    }
	}

	private boolean isValidDateFormat(String value, String format) {
	    try {
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
	        formatter.parse(value);
	        return true;
	    } catch (DateTimeParseException e) {
	        return false;
	    }
	}





}
