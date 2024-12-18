package edu.kh.plklj.common.scheduling.scheduler;


import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import edu.kh.plklj.common.scheduling.service.ScheduleService;
import edu.kh.plklj.image.service.ImageService;
import edu.kh.plklj.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuctionScheduler {
	
	private final ScheduleService service;
	private final ImageService bucketService;
	private final NotificationService	notificationService;
	
	// 10시마다 실행 할 스캐줄러
	@Scheduled(cron = "0 0 10 * * *")
	public void actionScheduling() {
		
		int result = service.auctionStartScheduling();
		
		int result2 = service.successfulAuction();
		
		int result3 = service.failAuction();
		
		
		log.info(">> ------------------------------- >>");
		log.info(">> 새 경매 관리자 실행");
		log.info(">> 시작된 경매 수 : {} 건", result);
		log.info(">> 낙찰된 경매 수 : {} 건", result2);
		log.info(">> 유찰된 경매 수 : {} 건", result3);
		log.info(">> ------------------------------- <<");
		
	}
	
	// 00시마다 실행 할 스캐줄러
	@Scheduled(cron = "0 1 10 * * *")
	public void penaltyScheduling() {
		
		int result4 = service.prisoners();
		
		log.info(">> ------------------------------- >>");
		log.info(">> 새 경매 관리자 실행");
		log.info(">> 줄어든 정지 회원 수 : {} 건", result4);
		log.info(">> ------------------------------- <<");
	}
	
	// 00시마다 실행 할 스캐줄러
	@Scheduled(cron = "0 2 10 * * *")
	public void dataServerScheduling() {
		
		int result = bucketService.deleteImage();
		
		log.info(">> ------------------------------- >>");
		log.info(">> 새 경매 관리자 실행");
		log.info(">> 이미지 수 : {} 건", result);
		log.info(">> ------------------------------- <<");
	}
	
	
	
	/************************** 예정경매 알림 **************************/
	
	
	// 스케줄러 이용한 한시간 전 알림 보내기
	@Scheduled(cron = "0 0 9 * * *")
	// @Scheduled(cron = "0/10 * * * * *")
	public void notifyAuctionItems() {
		
    int result = notificationService.sendAuctionNotifications(0, "찜한 게시물의 경매가 한 시간 뒤에 시작됩니다.");
    
    log.info(">> ------------------------------- >>");
    log.info(">> 한 시간 전 알림 시작");
    log.info(">> 한 시간 전 알림 완료: {} 건", result);
    log.info(">> ------------------------------- >>");
	}
	
	
	// 스케줄러 이용한 하루 전 알림 보내기
	@Scheduled(cron = "0 0 10 * * *")
	public void notifyAuctionOneDayBefore() {
		
		int result = notificationService.sendAuctionNotifications(1, "찜한 게시물의 경매가 내일 오전 10시에 시작됩니다."); 
		
		log.info(">> ------------------------------- >>");
		log.info(">> 하루 전 알림 시작");
		log.info(">> 하루 전 알림 : {} 건", result);
		log.info(">> ------------------------------- <<");
		
	}
	

	/************************** 예정경매 알림 **************************/

	// 스케줄러 이용한 방문자 테이블 한달 데이터 삭제
	@Scheduled(cron = "0 0 0 1 * *")
	public void deleteVisitor() {
		
		int result = service.deleteVisitor();
	}

	
	

}
