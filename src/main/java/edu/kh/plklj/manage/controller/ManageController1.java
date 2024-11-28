package edu.kh.plklj.manage.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.plklj.manage.service.DashboardService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("dashboard")
@RestController
@RequiredArgsConstructor
@Slf4j
public class ManageController1 {
	
	private final DashboardService service;
	
	@PostMapping("incrementVisitor")
	public ResponseEntity<Void> incrementVisitor(
			HttpServletRequest req,
			HttpServletResponse resp
			) {
		
		// 세션에서 방문 기록 확인
		Object visitedToday = req.getSession().getAttribute("visitedToday");
		
		if (visitedToday == null) { // 오늘 방문 기록이 없는 경우
			// 세션에 방문 기록 추가
			req.getSession().setAttribute("visitedToday", true);
			
			// 방문자 수 증가
			service.incrementVisitorCount();
			
			// 쿠키 추가 (방문 기록용)
			Cookie visitorCookie = new Cookie("visitor", "true");
			visitorCookie.setMaxAge(86400); // 1일
			visitorCookie.setPath("/");
			resp.addCookie(visitorCookie);
		}
		
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("visitorData")
	public ResponseEntity<Map<String, Object>> getVisitorDate() {
		Map<String, Integer> map = service.getVisitorCountForLastWeek();
		int monthlyTotal = service.getMonthlyTotal();
		
		 log.info("Weekly Data: {}", map); // 로그 추가
	    log.info("Weekly Total: {}", map);
	    log.info("Monthly Total: {}", monthlyTotal);
		
		Map<String, Object> map2 = Map.of(
					"weeklyData", map,
					"weeklyTotal", map.values().stream().mapToInt(Integer::intValue).sum(),
					"monthlyTotal", monthlyTotal
				);
		
		return ResponseEntity.ok(map2);
	}
  
  
	
}
















