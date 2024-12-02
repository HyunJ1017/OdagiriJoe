package edu.kh.plklj.notification.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import edu.kh.plklj.notification.controller.NotificationController;
import edu.kh.plklj.notification.dto.Notification;
import edu.kh.plklj.notification.mapper.NotificationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationServiceImpl implements NotificationService {
	private final NotificationMapper mapper;

	@Override
	public List<Map<String, Object>> notificationInsert(Notification notification) {

		int sendMemberNo = 0;
		
		List<Integer> reciveMemberNoList = null;

		// 팔로우 회원에게 알람 보내기인 경우
		if (notification.getNotiType().equals("F")) {
			sendMemberNo = notification.getSendMemberNo(); // 보내는 아티스트 번호
			reciveMemberNoList = mapper.selectFollowList(sendMemberNo);
		} else if (notification.getNotiType().equals("A")) {
			int pieceNo = notification.getPkNo(); // 보내는 게시물 번호
			reciveMemberNoList = mapper.wishList(pieceNo);
		}

		List<Map<String, Object>> list = null;
		int result = 0;

		// 회원에게 알림 보내기
		for (int reciveMemberNo : reciveMemberNoList) {
			notification.setReceiveMemberNo(reciveMemberNo);
			result += mapper.insertNotification(notification);
		}

		// 알림을 받아야하는 회원의 번호 + 안읽은 번호
		if (result == reciveMemberNoList.size()) {
			list = mapper.selectReceiveMember(reciveMemberNoList);
		}
		return list;
	}

	/* 위시리스트에 관한 알림 보내기 */
	@Override
	public int sendAuctionNotifications(int daysBefore, String message) {
		List<Integer> pieceNoList = mapper.getAuctionNotification(daysBefore);

		// 작품 별 위시리스트 등록 회원 번호 조회
		for (int pieceNo : pieceNoList) {
			List<Integer> memberList = mapper.wishList(pieceNo);
			String notiUrl = "/auction/auctionDetail?pieceNo=" + pieceNo;
			Notification notification = new Notification();
			notification.setPieceNo(pieceNo);
			notification.setNotiContent(message);
			notification.setNotiUrl(notiUrl);
			int result = 0;
			
			// 회원 번호 별 알림 전송
			for (int receiveMemberNo : memberList) {
				notification.setReceiveMemberNo(receiveMemberNo);
				result += mapper.insertNotification(notification); // 알림 삽입
			}

			if (result < memberList.size())
				return 0; // insert 실패 시

			// 접속한 회원 중 알림을 받아야되는 회원에게 알림 보내기
			for (int receiveMemberNo : memberList) {

				String clientId = String.valueOf(receiveMemberNo);
				SseEmitter emitter = NotificationController.emitters.get(clientId);
				if (emitter != null) {
					try {
						emitter.send(Map.of("pieceNo", pieceNo));
					} catch (Exception e) {
						NotificationController.emitters.remove(clientId);
					}
				}
			}
		}
		return 1;
	}
	
	@Override
	public List<Notification> selectNotification(int memberNo) {
		return mapper.selectNotificationList(memberNo);
	}

	/* 읽지 않은 알림 */
	@Override
	public int readCheck(int memberNo) {
		return mapper.readCheck(memberNo);
	}
	
	/* 알림 읽음 여부 변경 */
	@Override
	public void updateNotification(int notiNo) {
		mapper.updateNotification(notiNo);
	}
	
	/* 알림 삭제 */
	@Override
	public void deleteNotification(int notiNo) {
		mapper.deleteNotification(notiNo);
	}

}
