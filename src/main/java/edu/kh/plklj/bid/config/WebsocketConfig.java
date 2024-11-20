//package edu.kh.plklj.bid.config;
//
//import java.io.IOException;
//import java.util.concurrent.CopyOnWriteArraySet;
//
//import org.springframework.stereotype.Component;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import edu.kh.plklj.bid.dto.BidRequest;
//import edu.kh.plklj.bid.dto.BidResponse;
//import edu.kh.plklj.bid.service.BidService;
//import jakarta.websocket.OnClose;
//import jakarta.websocket.OnMessage;
//import jakarta.websocket.OnOpen;
//import jakarta.websocket.Session;
//import jakarta.websocket.server.ServerEndpoint;
//import lombok.RequiredArgsConstructor;
//
//@Component
//@RequiredArgsConstructor
//@ServerEndpoint("/websocket/bidding")
//public class WebsocketConfig {
//		
//		private final BidService serivce;
//
//    // 연결된 세션 관리
//    private static final CopyOnWriteArraySet<Session> sessions = new CopyOnWriteArraySet<>();
//
//    // ObjectMapper for JSON 처리
//    private static ObjectMapper objectMapper = new ObjectMapper();
//
//
//    @OnOpen
//    public void onOpen(Session session) {
//        sessions.add(session);
//        System.out.println("웹소켓 연결 성공: " + session.getId());
//    }
//
//    @OnClose
//    public void onClose(Session session) {
//        sessions.remove(session);
//        System.out.println("웹소켓 연결 종료: " + session.getId());
//    }
//
//    @OnMessage
//    public void onMessage(String message, Session session) throws IOException {
//        try {
//            // 클라이언트에서 받은 JSON 메시지를 객체로 변환
//            BidRequest bidRequest = objectMapper.readValue(message, BidRequest.class);
//
//            // DB 처리 (서비스 호출)
//            serivce.processBid(bidRequest.getPieceNo(), bidRequest.getMemberNo(), bidRequest.getBidPrice());
//
//            // 최신 입찰 금액 조회
//            double currentBidPrice = serivce.getCurrentBidPrice(bidRequest.getPieceNo());
//
//            // 브로드캐스트: 모든 클라이언트에 최신 입찰 정보 전송
//            for (Session s : sessions) {
//                if (s.isOpen()) {
//                    BidResponse response = new BidResponse(bidRequest.getPieceNo(), currentBidPrice);
//                    s.getBasicRemote().sendText(objectMapper.writeValueAsString(response));
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            session.getBasicRemote().sendText("오류 발생: " + e.getMessage());
//        }
//    }
//}
