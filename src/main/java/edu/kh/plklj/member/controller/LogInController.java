package edu.kh.plklj.member.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.service.LogInService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/* 로그인, 비밀번호 찾기, 아이디찾기
 */

@Slf4j
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
	public String logInPage(
				@RequestParam(value="message", required = false) String message,
				@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
				@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
				RedirectAttributes ra,
				Model model,
				// 개발자 도구에서 refer 확인
				// 세션에 저장
				@RequestHeader("referer") String referer,
				HttpSession session
			) {
		
		if(memberLogin != null || artistLogin != null) {
			return "redirect:/main";
		}
		
		session.setAttribute("returnUrl", referer);
		
		// param에 있는 message를 숨기고 재요청
		if(message != null) {
			ra.addFlashAttribute("message", message);
			return "redirect:/member/login";
		}
		
		String pageKey = "logIn";
		model.addAttribute("pageKey", pageKey);
		return "member-sign/signMain";
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
			RedirectAttributes ra,
			HttpSession session,
			Model model) {
		
		String returnUrl = (String) session.getAttribute("returnUrl");
		Member result = service.logIn(member);
		
		if(result == null ) {
			ra.addFlashAttribute("message", "아이디 또는 비밀번호가 잘못되었습니다.");
			return "redirect:/member/login";
		} else if ( result.getMemberPenalty() > 1) {
			ra.addFlashAttribute("message", "정지 해제까지 " + result.getMemberPenalty() + "일 남으셨습니다.");
			return "redirect:/member/login";
			
		} else if ( result.getArtistReg() == null || result.getArtistReg().equals("N")) {
			model.addAttribute("memberLogin", result);
			
			// url이 있다면 저장된 세션 얻어오기
			if(returnUrl != null) {
				session.removeAttribute("returnUrl");
				return "redirect:" + returnUrl;
			}
			
			return "redirect:/";
		} else {
			model.addAttribute("artistLogin", result);
			
			if(returnUrl != null) {
				session.removeAttribute("returnUrl");
				return "redirect:" + returnUrl;
			}
			
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
	
	
	/** 테스트용
	 * @return
	 */
	@GetMapping("test")
	public String goTestPage(Model model) {
		String pageKey = "logIn";
		model.addAttribute("pageKey", pageKey);
		return "member-sign/signMain";
	}
	
	
}
