package edu.kh.plklj.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.service.MyPageService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("member/myPage")
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
	
	
	/** 이름 수정하기
	 * @param member
	 * @return
	 */
	@PostMapping("updateName")
	@ResponseBody
	public int updateName(@RequestBody Member member) {
		return service.updateName(member);
	}
	
	
	
}
