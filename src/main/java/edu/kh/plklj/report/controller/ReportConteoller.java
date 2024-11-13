package edu.kh.plklj.report.controller;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("report")
@RequiredArgsConstructor
@Slf4j
public class ReportConteoller {
	private final ReportService service;

	
	/** 온라인 갤러리 작품 신고 팝업 창 이동
	 */
	@GetMapping("onlineReport")
	public String onlineReport() {
		return "reportPopup/reportPopup";
	}
	
	/** 경매 작품 신고 팝업 창 이동
	 */
	@GetMapping("auctionReport")
	public String auctionReport() {
		return "reportPopup/reportPopup";
	}
}
