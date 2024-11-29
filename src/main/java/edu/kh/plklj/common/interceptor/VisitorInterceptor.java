package edu.kh.plklj.common.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import edu.kh.plklj.common.util.IpUtil;
import edu.kh.plklj.manage.service.DashboardService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class VisitorInterceptor implements HandlerInterceptor {

	
	@Autowired
	private DashboardService service;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		// 방문자 쿠키 확인
		Cookie[] cookies = request.getCookies();
		boolean visitedToday = false;
		
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if("visitor".equals(cookie.getName())) {
					visitedToday = true;
					break;
				}
			}
		}
		
		if (!visitedToday) {
			// 방문자 증가
			String clientIp = IpUtil.getClientIp(request);
			service.checkAndIncrementVisitor(clientIp);
			
			// 방문자 쿠키 추가
			Cookie visitorCookie = new Cookie("visitor", "true");
			visitorCookie.setMaxAge(86400); // 1일
			visitorCookie.setPath("/");
			response.addCookie(visitorCookie);
		}
		
		return true; // 계속 진행
	}

	














}
