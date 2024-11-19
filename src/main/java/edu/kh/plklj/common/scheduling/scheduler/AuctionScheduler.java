package edu.kh.plklj.common.scheduling.scheduler;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import edu.kh.plklj.common.scheduling.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuctionScheduler {
	
	private final ScheduleService service;
	
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
	@Scheduled(cron = "0 0 0 * * *")
	public void penaltyScheduling() {
		
		int result4 = service.prisoners();
		
		log.info(">> ------------------------------- >>");
		log.info(">> 새 경매 관리자 실행");
		log.info(">> 줄어든 정지 회원 수 : {} 건", result4);
		log.info(">> ------------------------------- <<");
	}
	

}
