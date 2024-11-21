package edu.kh.plklj.bid.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import edu.kh.plklj.bid.handler.StockWebSocketHandler;

@Component
@EnableWebSocket // 웹소켓 활성화 어노테이션
public class WebSocketConfig implements WebSocketConfigurer {
		
		 private final StockWebSocketHandler stockWebSocketHandler;
		 
	    public WebSocketConfig(StockWebSocketHandler stockWebSocketHandler) {
	        this.stockWebSocketHandler = stockWebSocketHandler;
	    }
	    
	    @Override
	    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
	        /*webSocketHandler 를 추가*/
	        registry.addHandler(stockWebSocketHandler, "/bid").setAllowedOrigins("*"); // endpoint 설정과 CORS 설정(*)
	    }
}


