package edu.kh.plklj.piece.controller;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.piece.service.PieceService;
import edu.kh.plklj.report.controller.ReportConteoller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("piece")
@Slf4j
public class PieceController {
	private final PieceService service;
	
	/** 온라인 갤러리 조회 페이지 이동
	 * @return
	 */
	@GetMapping("online")
	public String onlineList() {
		return "online/onlineList";
	}
	
	/** 온라인 갤러리 상세 조회 페이지
	 *
	 */
	@GetMapping("onlineDetail")
	public String onlineDetail() {
		return "online/onlineDetail";
	}
	
	
}
