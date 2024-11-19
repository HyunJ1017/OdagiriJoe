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
	 @Override
   public Map<String, Object> notificationInsert(Notification notification) {
       int result = mapper.insertNotification(notification);
       if (result > 0) {
           return mapper.selectReceiveMember(notification.getNotiNo());
       }
       return null;
   }

   @Override
   public List<Notification> selectNotification(int memberNo) {
       return mapper.selectNotificationList(memberNo);
   }

   @Override
   public int readCheck(int memberNo) {
       return mapper.readCheck(memberNo);
   }

   @Override
   public void deleteNotification(int notiNo) {
       mapper.deleteNotification(notiNo);
   }

   @Override
   public void updateNotification(int notiNo) {
       mapper.updateNotification(notiNo);
   }

   @Override
   public List<Member> followList(int sendMemberNo) {
       return mapper.followList(sendMemberNo);
   }

   @Override
   public List<Notification> getAuctionNotification(int daysBefore) {
       return mapper.getAuctionNotification(daysBefore);
   }
}
