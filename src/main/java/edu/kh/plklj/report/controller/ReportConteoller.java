package edu.kh.plklj.report.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.report.dto.Report;
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

	// 온라인갤러리 신고하기
	@ResponseBody
	@PostMapping("report")
	public ResponseEntity<?> reportInsert(
			@RequestBody Report report,
			@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(value = "artistLogin", required = false) Member artistLogin
			){
		try {
			
			int loginNo = 0;
			
			if(memberLogin != null) {
				loginNo = memberLogin.getMemberNo();
			} else {
				loginNo = artistLogin.getMemberNo();
			}
			
			report.setMemberNo(loginNo);
			
			int result = service.reportInsert(report);
			

			if(result > 0) {
				return ResponseEntity.ok(result);
			} else {
				return ResponseEntity.badRequest().body("신고 접수에 실패");
			}
		} catch (Exception e) {
			log.error("신고 중 오류 발생", e);
			return ResponseEntity.status(500).body("서버 오류 발생");
		}
		
	}

















}
