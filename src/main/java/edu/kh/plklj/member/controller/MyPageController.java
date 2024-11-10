package edu.kh.plklj.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.member.service.MyPageService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("myPage")
@RequiredArgsConstructor
public class MyPageController {

	private final MyPageService service;
	
	/** 마이페이지로 이동
	 * @return
	 */
	@GetMapping("")
	public String myPage() {
		return "member-sign/myPage";
	}
	
}
