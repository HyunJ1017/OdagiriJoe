package edu.kh.plklj.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("main")
public class MainController {

	@GetMapping("")
	public String mainPage() {
		return "common/main";
	}
	
	// 메인 페이지 목록 조회
//	@GetMapping("")
//	public String main(@) {
//		return "common/main";
//	}
	
	
	
	
}
