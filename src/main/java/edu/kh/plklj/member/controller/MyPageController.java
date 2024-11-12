package edu.kh.plklj.member.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.service.MyPageService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("member/myPage")
@RequiredArgsConstructor
public class MyPageController {

	private final MyPageService service;
	
	/** 마이페이지로 이동(일반,작가)
	 * @return 일반회원 : 일반회원마이페이지, 작가: 작가마이페이지
	 */
	@GetMapping("")
	public String myPage(
			@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin
			) {
		if(memberLogin != null) {
			return "myPage/memberMyPage";
		}
		return "myPage/artistMyPage";
	}
	
	/** 구매내역 페이지로 이동(일반,작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("purchaseDetails")
	public String purchaseDetails() {
		return "myPage/purchaseDetails";
	}
	
	/** 진행경매 페이지로 이동 (일반,작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("progressiveAuction")
	public String progressiveAuction() {
		return "myPage/progressiveAuction";
	}
	
	/** 내 경매 페이지로 이동 (작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("artistAuction")
	public String artistAuction() {
		return "myPage/artistAuction";
	}
	
	/** 팔로우 및 위시리스트 페이지로 이동 (일반,작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("followAndWish")
	public String followAndWish() {
		return "myPage/followAndWish";
	}
	
	/** 작가 매출 확인 페이지로 이동 (일반,작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("salesConfirmation")
	public String salesConfirmation() {
		return "myPage/salesConfirmation";
	}
	
	/** 작가 등록 페이지로 이동 (일반,작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("artistRegistration")
	public String artistRegistration() {
		return "myPage/artistRegistration";
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
	
	/** 비밀번호 수정하기
	 * @param map : 현재 비밀번호와, 재입력할 비밀번호
	 * @return
	 */
	@PostMapping("updatePw")
	@ResponseBody
	public int updateName(@RequestBody Map<String, String> map) {
		return service.updatePw(map);
	}
	
	/** 전화번호 수정하기
	 * @param map : 현재 비밀번호와, 재입력할 비밀번호
	 * @return
	 */
	@PostMapping("updatePhone")
	@ResponseBody
	public int updatePhone(@RequestBody Member member) {
		return service.updatePhone(member);
	}
	
	
	/** 은행리스트보내주기
	 * @return
	 */
	@GetMapping("getBankList")
	@ResponseBody
	public List<BankCode> getBankList() {
		return service.getBankList();
	}
	
	/** 닉네임 중복검사
	 * @param inputNickname
	 * @return
	 */
	@GetMapping("checkNickname")
	@ResponseBody
	public int checkNickname(@RequestParam("artistNickname") String inputNickname) {
		return service.checkNickname(inputNickname);
	}
	
	
	@PostMapping("insertArtist")
	public String insertArtist(
			@ModelAttribute Member artist,
			@RequestParam("inputArtistPortfolio") MultipartFile inputArtistPortfolio,
			@RequestParam("inputArtistProfile")  MultipartFile inputArtistProfile
			) {
		
		int result = service.insertArtist(artist, inputArtistPortfolio, inputArtistProfile);
		return "redirect:/";
	}
	
	
}
