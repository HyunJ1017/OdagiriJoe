package edu.kh.plklj.notification.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import edu.kh.plklj.notification.dto.Notification;
import edu.kh.plklj.notification.mapper.NotificationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
	private final NotificationMapper mapper;
	
	 @Override
   public List<Map<String, Object>> notificationInsert(Notification notification) {
		 
		 int sendMemberNo = 0; 
		 List<Integer> reciveMemberNoList = null;
		 
		 
		 // 팔로우 회원에게 알람 보내기인 경우
		 if(notification.getNotiType().equals("F")) {
			 sendMemberNo = notification.getSendMemberNo(); // 보내는 아티스트 번호
			 reciveMemberNoList = mapper.selectFollowList(sendMemberNo);
		 }

		 
		 List<Map<String, Object>> list = null;
     int result = 0;
    		 
     // 회원에게 알림 보내기
     for(int reciveMemberNo : reciveMemberNoList) {
    	 notification.setReceiveMemberNo(reciveMemberNo);
    	 result += mapper.insertNotification(notification);
     }
     

     // 알림을 받아야하는 회원의 번호 + 안읽은 번호
     if (result ==  reciveMemberNoList.size()) {
    	 list = mapper.selectReceiveMember(reciveMemberNoList);
     }
     
     return list;
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
   public List<Notification> getAuctionNotification(int daysBefore) {
       return mapper.getAuctionNotification(daysBefore);
   }
}
