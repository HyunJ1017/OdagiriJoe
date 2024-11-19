package edu.kh.plklj.notification.service;

import java.util.List;

import java.util.Map;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.notification.dto.Notification;
import edu.kh.plklj.piece.dto.Piece;

public interface NotificationService {

	/** 알림 전송
	 * @param notification
	 * @return
	 */
	Map<String, Object> notificationInsert(Notification notification);

	/** 로그인한 회원의 알림 목록 조회
	 * @param memberNo
	 * @return
	 */
	List<Notification> selectNotification(int memberNo);

	/** 안읽은 알림 목록
	 * @param memberNo
	 * @return
	 */
	int readCheck(int memberNo);

	/** 알림 삭제
	 * @param notiNo
	 */
	void deleteNotification(int notiNo);

	/** 알림 읽음 여부 변경
	 * @param notiNo
	 */
	void updateNotification(int notiNo);

	/** 팔로우 작가 게시물 알림
	 * @param sendMemberNo
	 * @return
	 */
	List<Member> followList(int sendMemberNo);
	
}
