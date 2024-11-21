//package edu.kh.plklj.bid.handler;
//
//import org.springframework.web.socket.CloseStatus;
//import org.springframework.web.socket.WebSocketMessage;
//import org.springframework.web.socket.WebSocketSession;
//
//public interface WebSocketHandler {
//	
//  void afterConnectionEstablished(WebSocketSession session) throws Exception;
//  // 웹소켓 연결이 된 후에 호출
//  
//  void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception;
//  // 웹소켓 메세지가 도착하면 호출
//  
//  void handleTransportError(WebSocketSession session, Throwable exception) throws Exception;
//  // 웹소켓 메세지 오류 처리
//  
//  void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception;
//  // 웹소켓 연결이 해제된 후에 호출
//
//  boolean supportsPartialMessages();
//  // 웹소켓 핸들러가 부분 메세지를 처리하는 지 여부
//}
