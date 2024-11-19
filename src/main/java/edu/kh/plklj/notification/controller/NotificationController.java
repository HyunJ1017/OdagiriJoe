package edu.kh.plklj.notification.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
@Slf4j
public class NotificationController {
	private final NotificationService service;
	private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
	
	@GetMapping("/common/noti")
	public SseEmitter notificationList(@SessionAttribute("memberLogin") Member memberLogin) {
		String clientId = memberLogin.getMemberNo() + "";
		SseEmitter emitter = new SseEmitter(10 * 60 * 1000L);
		emitters.put(clientId, emitter);
		emitter.onCompletion(() -> emitters.remove(clientId));
		emitter.onTimeout(() -> emitters.remove(clientId));
		
		return emitter;
	}
	
	/* 팔로우 작가 게시물 알림 */
	@PostMapping("/common/notify/followed-artist-upload")
	public void notifyFollowedArtistUpload(@RequestBody Notification notification) {
		// 팔로우한 회원 목록 조회
		List<Member> follower = service.followList(notification.getSendMemberNo());

		for (Member followerArtists : follower) {
			notification.setReceiveMemberNo(followerArtists.getMemberNo());
			notification.setNotiContent("팔로우한 작가가 새로운 작품을 업로드했습니다.");

			Map<String, Object> map = service.notificationInsert(notification);
			String clientId = map.get("receiveMemberNo").toString();
			SseEmitter emitter = emitters.get(clientId);
			if (emitter != null) {
				try {
					emitter.send(map);
				} catch (Exception e) {
					emitters.remove(clientId);
				}
			}
		}
	}
	
	/* 알림 메시지 전송 */
	@PostMapping("/common/send")
	public void sendNotifiCation(@RequestBody Notification notification, @SessionAttribute("memberLogin") Member memberLogin) {
		
	notification.setSendMemberNo(memberLogin.getMemberNo());

		Map<String, Object> map = service.notificationInsert(notification);
		String clientId = map.get("receiveMemberNo").toString();
		SseEmitter emitter = emitters.get(clientId);
		if(emitter != null) {
			try {
				emitter.send(map);
			} catch (Exception e) {
				emitters.remove(clientId);
			}
		}
	}
	
	/** 로그인한 회원의 알림 목록 조회
	 * @param memberLogin
	 * @return
	 */
	@GetMapping("noti")
	public List<Notification> selecoNotification(@SessionAttribute("memberLogin") Member memberLogin) {
		int memberNo = memberLogin.getMemberNo();
		return service.selectNotification(memberNo);
	}
	
	/** 안 읽은 알림 목록
	 * @param memberLogin
	 * @return
	 */
	@GetMapping("noti/readCheck")
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
