package edu.kh.plklj.manage.service;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
	
	private final RedisTemplate<String, String> redisTemplate;
	
	@Override
	public void incremrntVisitorCount() {
		String todayKey = "visitor_count:" + LocalDate.now();
		redisTemplate.opsForValue().increment(todayKey);
		log.info("방문자 수 증가 : {}", todayKey);
	}
	
	@Override
	public Map<String, Integer> getVisitorCountForLastWeek() {
		Map<String, Integer> visitorData = new LinkedHashMap<>();
		
		// 오늘 날짜 기준으로 일주일간의 날짜 생성
		LocalDate today = LocalDate.now();
		for (int i = 6; i >= 0; i--) {
			LocalDate date = today.minusDays(i);
			String key = "Visitor_count:" + date;
			
			// Redis에서 데이터 조회
			String count = redisTemplate.opsForValue().get(key);
			log.info("조회된 키: {}, 방문자 수: {}", key, count);
			visitorData.put(date.toString(), count != null ? Integer.parseInt(count) : 0);
		}
		
		return visitorData;
	}

	
	
}
