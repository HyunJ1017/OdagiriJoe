package edu.kh.plklj.bid.handler;


import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.kh.plklj.bid.dto.BidRequest;
import edu.kh.plklj.bid.dto.BidResponse;
import edu.kh.plklj.bid.service.BidService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component 
@RequiredArgsConstructor
//  Spring Bean으로 등록하여 WebSocket 설정
// TextWebSocketHandler: 텍스트 기반 메시지 처리
public class StockWebSocketHandler extends TextWebSocketHandler {

    private final BidService service; // BidService 주입
    
    private final Map<String, WebSocketSession> sessionMap = new ConcurrentHashMap<>(); // 세션 관리

    // 클라이언트 메시지 처리
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    	
    	try {
    		 
    		// readValue(message.getPayload(), BidRequest.class) JSON 데이터를 BidRequest 클래스의 객체로 변환.
    		// JSON 데이터를 Java 객체로 변환
        BidRequest bidRequest = new ObjectMapper().readValue(message.getPayload(), BidRequest.class);
        
        log.info("Received Bid Data: {}", bidRequest);

        // 입찰 저장
        BidResponse response = service.processBid(bidRequest);

        // 성공 시 클라이언트들에게 응답 전송
        broadcastBidUpdate(response);

	    } catch (IllegalArgumentException e) {
	        log.error("Bid validation failed: {}", e.getMessage());
	        session.sendMessage(new TextMessage("{\"error\": \"" + e.getMessage() + "\"}"));
	    } catch (Exception e) {
	        log.error("Error processing bid message: {}", e.getMessage(), e);
	        session.sendMessage(new TextMessage("{\"error\": \"Failed to process bid.\"}"));
	    }
    }
    

    // 웹소켓 연결
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("WebSocket Connected: Session ID = {}", session.getId());
        sessionMap.put(session.getId(), session); // 연결된 클라이언트의 세션 정보를 sessionMap에 저장
    }

    // 웹소켓 연결 해제
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("WebSocket Disconnected: Session ID = {}", session.getId());
        sessionMap.remove(session.getId());
    }

    // 현재 최고 입찰가를 모든 클라이언트에게 전송
    private void broadcastBidUpdate(BidResponse response) {
        synchronized (sessionMap) {
            sessionMap.values().forEach(session -> {
                try {
                    // 연결 상태 확인
                    if (session.isOpen()) {
                        String jsonResponse = new ObjectMapper().writeValueAsString(response);
                        session.sendMessage(new TextMessage(jsonResponse));
                        log.info("Broadcasted bid update to session {}: {}", session.getId(), jsonResponse);
                    } else {
                        log.warn("Skipped closed session: {}", session.getId());
                    }
                } catch (IOException e) {
                    log.error("Error broadcasting bid update to session {}: {}", session.getId(), e.getMessage());
                }
            });
        }
    }
}
