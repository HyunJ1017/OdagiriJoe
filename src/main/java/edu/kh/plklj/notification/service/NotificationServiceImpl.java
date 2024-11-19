package edu.kh.plklj.notification.service;

import java.util.List;

import java.util.Map;

import org.springframework.stereotype.Service;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.notification.dto.Notification;
import edu.kh.plklj.notification.mapper.NotificationMapper;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
	private final NotificationMapper mapper;

	/* 알림 전송 */
	@Override
	public Map<String, Object> notificationInsert(Notification notification) {
		int result = mapper.insertNotification(notification);
		Map<String, Object> map = null;
		if(result > 0) { 
			map = mapper.selectReceiveMember(notification.getNotiNo());
		}
		return map;
	}

	/* 로그인한 회원의 알림 목록 */
	@Override
	public List<Notification> selectNotification(int memberNo) {
	return mapper.selectNotificationList(memberNo);
	}

		/* 안읽은 알림 목록 */
		@Override
		public int readCheck(int memberNo) {
			return mapper.readCheck(memberNo);
		}

		/* 알림 삭제 */
		@Override
		public void deleteNotification(int notiNo) {
			mapper.deleteNotification(notiNo);
		}

		/* 알림 읽음 여부 변경 */
		@Override
		public void updateNotification(int notiNo) {
			mapper.updateNotification(notiNo);
		}

		/* 팔로우 작가 게시물 알림 */
		@Override
		public List<Member> followList(int sendMemberNo) {
			return mapper.followList(sendMemberNo);
		}

}
