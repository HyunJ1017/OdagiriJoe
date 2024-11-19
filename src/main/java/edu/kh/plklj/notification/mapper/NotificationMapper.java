package edu.kh.plklj.notification.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.notification.dto.Notification;

@Mapper
public interface NotificationMapper {

	/** 알림 삽입
	 * @param notification
	 * @return
	 */
	int insertNotification(Notification notification);

	/** 수신자 정보 조회
	 * @param notiNo
	 * @return
	 */
  Map<String, Object> selectReceiveMember(int notiNo);

  /** 알림 목록 조회
   * @param memberNo
   * @return
   */
  List<Notification> selectNotificationList(int memberNo);

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
  List<Member> followList(int sendMemberNo);

  /** 경매 알림 목록 조회
   * @param daysBefore
   * @return
   */
  List<Notification> getAuctionNotification(int daysBefore);
}
