package edu.kh.plklj.notification.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.notification.dto.Notification;
import edu.kh.plklj.notification.service.NotificationService;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/notification")
@Slf4j
public class NotificationController {
	private final NotificationService service;
	private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
	
	@GetMapping("noti")
	public SseEmitter notificationList(@SessionAttribute("memberLogin") Member memberLogin) {
		String clientId = memberLogin.getMemberNo() + "";
		SseEmitter emitter = new SseEmitter(10 * 60 * 1000L);
		emitters.put(clientId, emitter);
		emitter.onCompletion(() -> emitters.remove(clientId));
		emitter.onTimeout(() -> emitters.remove(clientId));
		
		return emitter;
	}
	
	/* 알림 메시지 전송 */
	@PostMapping("send")
	public void sendNotifiCation(@RequestBody Notification notification, 
			@SessionAttribute(value="memberLogin", required = false) Member memberLogin,
			@SessionAttribute(value="artistLogin", required = false) Member artistLogin) {
   
		int memberNo = 0;
		if(memberLogin == null) {
			memberNo = artistLogin.getMemberNo();
		} else {
			memberNo = memberLogin.getMemberNo();
		}
		
		notification.setSendMemberNo(memberNo);
    
    
		List<Map<String, Object>> list = service.notificationInsert(notification);
		for(Map<String, Object> map : list) {
		
	    String clientId = map.get("receiveMemberNo").toString();
	    SseEmitter emitter = emitters.get(clientId);
	    if (emitter != null) {
	        try {
	            emitter.send(Map.of(clientId, map.get("notiCount").toString()));
	        } catch (Exception e) {
	            emitters.remove(clientId);
	        }
	    }
	    
		}
		
	}

	// 스케줄러 이용한 알림 보내기
	@Scheduled(cron = "0 0 9 * * *")
	public void notifyAuctionItems() {
		List<Notification> tomorrowNotifications = service.getAuctionNotification(1);
		List<Notification> todayNotifications = service.getAuctionNotification(0);

		// 전날 알림
		if (!tomorrowNotifications.isEmpty()) {
			sendAuctionNotifications(tomorrowNotifications, "찜한 게시물의 경매가 내일 오전 10시에 시작됩니다.");
		}

		// 당일 알림
		if (!todayNotifications.isEmpty()) {
			sendAuctionNotifications(todayNotifications, "찜한 게시물의 경매가 오늘 오전 10시에 시작됩니다.");
		}
	}

	private void sendAuctionNotifications(List<Notification> notifications, String message) {
		for (Notification notification : notifications) {
			// 메시지 설정
			notification.setNotiContent(message);

			// 경매 상태에 따른 URL 처리
			String notiUrl;
			if ("A".equals(notification.getPiece())) { // 경매 전 상태
				notiUrl = "/auction/upCommingDetail?pieceNo=" + notification.getPieceNo();
			} else if ("S".equals(notification.getPiece())) { // 경매 중 상태
				notiUrl = "/auction/currentDetail?pieceNo=" + notification.getPieceNo();
			} else {
				System.err.println("알 수 없는 경매 상태: " + notification.getPiece());
				continue;
			}

			notification.setNotiUrl(notiUrl);

			// 알림 전송
			sendNotification(notification);
		}
	}


	private void sendNotification(Notification notification) {
		List<Map<String, Object>> list = service.notificationInsert(notification);
		
		for(Map<String, Object> map : list) {
		
	    String clientId = map.get("receiveMemberNo").toString();
	    SseEmitter emitter = emitters.get(clientId);
	    if (emitter != null) {
	        try {
	            emitter.send(Map.of(clientId, map.get("notiCount").toString()));
	        } catch (Exception e) {
	            emitters.remove(clientId);
	        }
	    }
		}
	}

	/** 로그인한 회원의 알림 목록 조회
	 * @param memberLogin
	 * @return
	 */
	@ResponseBody
	@GetMapping("list")
	public List<Notification> selecoNotification(@SessionAttribute("memberLogin") Member memberLogin) {
		int memberNo = memberLogin.getMemberNo();
		return service.selectNotification(memberNo);
	}
	
	/** 안 읽은 알림 목록
	 * @param memberLogin
	 * @return
	 */
	@GetMapping("readCheck")
	public int readCheck(@SessionAttribute("memberLogin") Member memberLogin) {
		return service.readCheck(memberLogin.getMemberNo());
	}
	
	/** 알림 삭제
	 * @param notificationNo
	 */
	@DeleteMapping("noti")
	public void deleteNotification(@RequestBody int notiNo) {
		service.deleteNotification(notiNo);
	}
	
	/** 알림 읽음 여부 변경
	 * @param notificationNo
	 */
	@PutMapping("noti")
	public void updateNotification(@RequestBody int notiNo) {
		service.updateNotification(notiNo);
	}

}
