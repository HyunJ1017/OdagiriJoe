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
	List<Map<String, Object>> notificationInsert(Notification notification);

	/** 알림 목록 조회
	 * @param memberNo
	 * @return
	 */
  List<Notification> selectNotification(int memberNo);

  /** 읽지 않은 알림 개수 조회
   * @param memberNo
   * @return
   */
  int readCheck(int memberNo);

  /** 알림 삭제
   * @param notiNo
   */
  void deleteNotification(int notiNo);

  /** 알림 읽음 처리
   * @param notiNo
   */
  void updateNotification(int notiNo);

  /** 팔로우한 회원 목록 조회
   * @param sendMemberNo
   * @return
   */
//  List<Member> followList(int sendMemberNo);

  /** 경매 알림 목록 조회
   * @param daysBefore
   * @return
   */
  List<Notification> getAuctionNotification(int daysBefore);
}
