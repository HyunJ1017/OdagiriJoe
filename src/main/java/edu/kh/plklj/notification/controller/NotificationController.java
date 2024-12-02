package edu.kh.plklj.notification.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.notification.dto.Notification;
import edu.kh.plklj.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Controller
@RequiredArgsConstructor
@RequestMapping("/notification")
@Slf4j
public class NotificationController {
	private final NotificationService service;
	public static final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
	
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
			@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(value = "artistLogin", required = false) Member artistLogin) {
		int memberNo = 0;
		if (memberLogin == null) {
			memberNo = artistLogin.getMemberNo();
		} else {
			memberNo = memberLogin.getMemberNo();
		}
		notification.setSendMemberNo(memberNo);
		List<Map<String, Object>> list = service.notificationInsert(notification);
		for (Map<String, Object> map : list) {
			String clientId = map.get("receiveMemberNo").toString();
			SseEmitter emitter = emitters.get(clientId);
			if (emitter != null) {
				try {
					emitter.send(Map.of("clientId",clientId, "notiCount", map.get("notificationCount").toString()));
				} catch (Exception e) {
					emitters.remove(clientId);
				}
			}
		}
	}
	
	private void sendNotification(Notification notification) {
		List<Map<String, Object>> list = service.notificationInsert(notification);
		for (Map<String, Object> map : list) {
			String clientId = map.get("receiveMemberNo").toString();
			SseEmitter emitter = emitters.get(clientId);
			if (emitter != null) {
        try {
            // 안 읽은 알림 개수를 추가해서 보냄
            int notificationCount = service.readCheck(Integer.parseInt(clientId));
            emitter.send(Map.of(
                "clientId", clientId,
                "notiCount", notificationCount
            ));
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
	public List<Notification> selecoNotification(@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
																							 @SessionAttribute(value = "artistLogin", required = false) Member artistLogin) {
		int memberNo = 0;
		if (memberLogin == null) {
			memberNo = artistLogin.getMemberNo();
		} else {
			memberNo = memberLogin.getMemberNo();
		}
		return service.selectNotification(memberNo);
	}
	
	/** 안 읽은 알림 목록
	 * @param memberLogin
	 * @return
	 */
	@GetMapping("readCheck")
	public int readCheck(@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
											 @SessionAttribute(value = "artistLogin", required = false) Member artistLogin) {
		int memberNo = 0;
		if (memberLogin == null) {
			memberNo = artistLogin.getMemberNo();
		} else {
			memberNo = memberLogin.getMemberNo();
		}
		return service.readCheck(memberNo);
	}
	
	/** 알림 수정
	 * @param notiNo
	 */
	@PutMapping("noti/{notiNo}")
	@ResponseBody
	public void updateNotification(@PathVariable("notiNo") int notiNo, 
			@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(value = "artistLogin", required = false) Member artistLogin) {
		int memberNo = 0;
		if (memberLogin == null) {
			memberNo = artistLogin.getMemberNo();
		} else {
			memberNo = memberLogin.getMemberNo();
		}
	    service.updateNotification(notiNo, memberNo);
	}

	/** 알림 삭제
	 * @param notificationNo
	 */
	@ResponseBody
	@DeleteMapping("delete/{notiNo}")
	public void deleteNotification(@PathVariable("notiNo") int notiNo, @SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
																 @SessionAttribute(value = "artistLogin", required = false) Member artistLogin) {
		int memberNo = 0;
		if (memberLogin == null) {
			memberNo = artistLogin.getMemberNo();
		} else {
			memberNo = memberLogin.getMemberNo();
		}
		service.deleteNotification(notiNo, memberNo);
	}

}
