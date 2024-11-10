package edu.kh.plklj.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.service.SignUpService;
import lombok.RequiredArgsConstructor;

/* 회원가입
 */

@RequestMapping("signUp")
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
	
	
	@PostMapping("")
	public String signUp(
			@ModelAttribute Member member,
			@RequestParam("inputPw") String inputPw) {
		
		int result = service.signUp(member, inputPw);
		
		if(result > 0)	return "redirect:/";
		else {
			return "/signUp";
		}
	}

}
