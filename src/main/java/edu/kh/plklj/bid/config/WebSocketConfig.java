package edu.kh.plklj.bid.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import edu.kh.plklj.bid.handler.StockWebSocketHandler;
import lombok.RequiredArgsConstructor;

@Component
@EnableWebSocket // 웹소켓 활성화 어노테이션
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
		
		 private final StockWebSocketHandler stockWebSocketHandler;

	    @Override
	    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
	        /* 웹소켓 핸들러에 stockWebSocketHandler, 경로를 추가*/
	        registry.addHandler(stockWebSocketHandler, "/bid").setAllowedOriginPatterns
	    		(
	    				"http://localhost/",
	    				"http://127.0.0.1/",
	    				"http://192.168.10.28/"
	    		)
	    		; // endpoint 설정과 CORS 설정(*)
	    }
	    
	    
	    // setAllowedOrigins("*"): 모든 도메인에서 WebSocket 연결을 허용
	    // setAllowedOriginPatterns : 특정 도메인만 허용
	    // WebSocketHandlerRegistry : 엔드포인트에 등록할 객체
	    // addHandler: /bid 경로에서 stockWebSocketHandler가 WebSocket 요청을 처리.
}


