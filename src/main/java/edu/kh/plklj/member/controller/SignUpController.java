package edu.kh.plklj.member.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.service.SignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/* 회원가입
 */

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("member/signUp")
public class SignUpController {
	
	private final SignUpService service;
	
	/** 회원가입 페이지로 이동
	 * @return
	 */
	@GetMapping("")
	public String signUpPage(
			@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			@RequestParam(value="message", required = false) String message,
			RedirectAttributes ra,
			Model model) {
		
		if(memberLogin != null || artistLogin != null) {
			return "redirect:/main";
		}
		
		// param에 있는 message를 숨기고 재요청
		if(message != null) {
			ra.addFlashAttribute("message", message);
			return "redirect:/member/signUp";
		}
		String pageKey = "signUp";
		model.addAttribute("pageKey", pageKey);
		return "member-sign/signMain";
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
