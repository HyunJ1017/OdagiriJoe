package edu.kh.plklj.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import edu.kh.plklj.common.interceptor.VisitorInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

	@Autowired
	private VisitorInterceptor visitorInterceptor;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		// 특정 URL 패턴에만 적용
		registry.addInterceptor(visitorInterceptor)
						.addPathPatterns("/") // 메인 페이지
						.excludePathPatterns("/static/**", "/css/**", "/js/**"); // 정적 리소스 제외
	}
}
