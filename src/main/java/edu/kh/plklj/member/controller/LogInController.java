package edu.kh.plklj.member.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.service.LogInService;
import lombok.RequiredArgsConstructor;

/* 로그인, 비밀번호 찾기, 아이디찾기
 */

@Controller
@RequestMapping("member/login")
@RequiredArgsConstructor
@SessionAttributes({"memberLogin", "artistLogin"})
public class LogInController {

	private final LogInService service;
	
	/** 로그인 페이지로 이동
	 * @return
	 */
	@GetMapping("")
	public String logInPage() {
		return "member-sign/logIn";
	}
	
	/** 아이디찾기 페이지로 이동
	 * @return
	 */
	@GetMapping("findingId")
	public String findIdPage() {
		return "member-sign/findId";
	}
	
	/** 비밀번호찾기 페이지로 이동
	 * @return
	 */
	@GetMapping("findingPasswords")
	public String findPwPage() {
		return "member-sign/findPw";
	}
	
	/** 로그인 확인
	 * @return
	 */
	@PostMapping("")
	public String logIn(
			@ModelAttribute Member member,
			Model model) {
		
		Member result = service.logIn(member);
		
		if(result == null ) {
			return "redirect:/logIn";
		} else if (result.getArtistReg().equals("N")) {
			model.addAttribute("memberLogin", result);
			return "redirect:/";
		} else {
			model.addAttribute("artistLogin", result);
			return "redirect:/";
		}
	}
	
	/** 아이디, 전화번호 확인
	 * @param inputPhone
	 * @param inputId
	 * @return
	 */
	@GetMapping("searchIdPh")
	@ResponseBody
	public int searchIdPh(
			@RequestParam("inputPhone") String inputPhone,
			@RequestParam("inputId") String inputId	) {
		return service.searchIdPh(inputPhone, inputId);
	}
	
	/** 비밀번호 변경
	 * @param member
	 * @return
	 */
	@PostMapping("changePw")
	@ResponseBody
	public int changePw(
			@RequestBody Member member) {
		return service.changePw(member);
	}
	
	
	/** 로그아웃
	 * @param status
	 * @return
	 */
	@GetMapping("logout")
	public String logout(SessionStatus status) {
		
		status.setComplete();
		
		return "redirect:/";
	}
	
}
