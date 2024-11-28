package edu.kh.plklj.member.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.service.SignUpService;
import lombok.RequiredArgsConstructor;

/* 회원가입
 */

@RequestMapping("member/signUp")
@Controller
@RequiredArgsConstructor
public class SignUpController {
	
	private final SignUpService service;
	
	/** 회원가입 페이지로 이동
	 * @return
	 */
	@GetMapping("")
	public String signUpPage() {
		return "member-sign/signUp";
	}
	
	
	/** 아이디 중복검사
	 * @param inputId
	 * @return
	 */
	@GetMapping("idCheck")
	@ResponseBody
	public int idCheck(@RequestParam("inputId") String inputId) {
		return service.idCheck(inputId);
	}
	
	
	/** 회원가입
	 * @param member
	 * @param inputPw
	 * @return
	 */
	@PostMapping("")
	@ResponseBody
	public int signUp(
			@RequestBody Map<String, String> map) {
		
		Member member = Member.builder()
				.memberId(map.get("memberId"))
				.memberName(map.get("memberName"))
				.memberEmail(map.get("memberEmail"))
				.memberPhone(map.get("memberPhone"))
				.build();
				
		
		String inputPw = map.get("inputPw");
		
		int result = service.signUp(member, inputPw);
		
		if(result > 0) return member.getMemberNo();
		else return 0;
	}

}
