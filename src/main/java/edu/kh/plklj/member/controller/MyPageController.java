package edu.kh.plklj.member.controller;

import java.util.List;
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
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.service.MyPageService;
import edu.kh.plklj.notice.dto.Notice;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("member/myPage")
@SessionAttributes({"memberLogin", "artistLogin"})
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
		} else if(artistLogin != null) {
			return "myPage/artistMyPage";
		} else {
			return "redirect:/";
		}
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
	public String progressiveAuction(
			@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			Model model) {
		
		int memberNo = 0;
		if(memberLogin != null) {
			memberNo = memberLogin.getMemberNo();
		} else if (artistLogin != null){
			memberNo = artistLogin.getMemberNo();
		} else {
			return "redirect:/main";
		}
		
		// 구매내역 가져오기
		List<Piece> buyList = service.getBuyList(memberNo);
		List<Piece> auctionList = service.getAuctionList(memberNo);
		
		model.addAttribute("buyList", buyList);
		model.addAttribute("auctionList", auctionList);
		
		return "myPage/progressiveAuction";
	}
	
	/** 내 경매 페이지로 이동 (작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("artistAuction")
	public String artistAuction(
			@SessionAttribute("artistLogin") Member artistLogin,
			Model model) {
		
		int memberNo = 0;
		if(artistLogin != null){
			memberNo = artistLogin.getMemberNo();
		} else {
			return "redirect:/main";
		}
		
		// 진행중인 경매물품 조회하기
		List<Piece> pieceList = service.artistAuction(memberNo);
		
		model.addAttribute("pieceList", pieceList);
		
		return "myPage/artistAuction";
	}
	

	/** 팔로우 및 위시리스트 페이지로 이동 (일반,작가)
	 * @param memberLogin
	 * @param artistLogin
	 * ** 페이지네이션은 비동기로 작동
	 * @param model
	 * @return
	 */
	@GetMapping("followAndWish")
	public String followAndWish(
			@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			Model model) {
		
		int memberNo = 0;
		if(memberLogin != null) {
			memberNo = memberLogin.getMemberNo();
		} else if (artistLogin != null){
			memberNo = artistLogin.getMemberNo();
		} else {
			return "redirect:/main";
		}
		
		// 팔로우, 위시리스트 얻어오기
		Map<String, Object> map = service.followAndWish(memberNo);
		
		model.addAttribute("followList", map.get("followList"));
		model.addAttribute("followPagination", map.get("followPagination"));
		model.addAttribute("wishList", map.get("wishList"));
		model.addAttribute("wishPagination", map.get("wishPagination"));
		
		return "myPage/followAndWish";
	}
	
	/** 작가 매출 확인 페이지로 이동 (일반,작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("salesConfirmation")
	public String salesConfirmation(
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin) {
		
		if(artistLogin == null) {
			return "redirect:/main";
		}
		
		return "myPage/salesConfirmation";
	}
	
	/** 작가 등록 페이지로 이동 (작가)
	 * @return 구매내역 페이지
	 */
	@GetMapping("artistRegistration")
	public String artistRegistration(
			@SessionAttribute("memberLogin") Member memberLogin,
			Model model,
			RedirectAttributes ra) {
		
		int memberNo = 0;
		if(memberLogin != null) {
			memberNo = memberLogin.getMemberNo();
		} else {
			return "redirect:/main";
		}
		
		Member getArtistInfo = service.getArtistInfo(memberNo);
		log.info("getArtistInfo : {}", getArtistInfo);
		if(getArtistInfo != null) {
			ra.addFlashAttribute("message", "이전 신청내역이 아직 처리중입니다.");
			return "redirect:/member/myPage";
		}
		
		return "myPage/artistRegistration";
	}
	
	
	/** 이름 수정하기
	 * @param member
	 * @return 1,0
	 */
	@PostMapping("updateName")
	@ResponseBody
	public int updateName(
			@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			Model model,
			@RequestBody Member member) {
		
		int result = service.updateName(member);
		
		if(result != 0) {
			if(memberLogin != null) {
				memberLogin.setMemberName(member.getMemberName());
				model.addAttribute("memberLogin", memberLogin);
			} else if (artistLogin != null) {
				artistLogin.setMemberName(member.getMemberName());
				model.addAttribute("artistLogin", artistLogin);
			}
		}
		
		return result;
	}
	
	/** 작가활동명 수정하기
	 * @param member
	 * @return 1,0
	 */
	@PostMapping("updateNickname")
	@ResponseBody
	public int updateNickname(
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			Model model,
			@RequestBody Member member) {
		int result = service.updateNickname(member);
		
		if(result != 0) {
			if (artistLogin != null) {
				artistLogin.setArtistNickname(member.getArtistNickname());
				model.addAttribute("artistLogin", artistLogin);
			}
		}
		
		return result;
	}
	
	/** 비밀번호 수정하기
	 * @param map : 현재 비밀번호와, 재입력할 비밀번호
	 * @return 1,0
	 */
	@PostMapping("updatePw")
	@ResponseBody
	public int updateName(@RequestBody Map<String, String> map) {
		return service.updatePw(map);
	}
	
	/** 전화번호 수정하기
	 * @param map : 현재 비밀번호와, 재입력할 비밀번호
	 * @return 1,0
	 */
	@PostMapping("updatePhone")
	@ResponseBody
	public int updatePhone(
			@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			Model model,
			@RequestBody Member member) {
		
		int result = service.updatePhone(member);
		
		if(result != 0) {
			if(memberLogin != null) {
				memberLogin.setMemberName(member.getMemberName());
				model.addAttribute("memberLogin", memberLogin);
			} else if (artistLogin != null) {
				artistLogin.setMemberName(member.getMemberName());
				model.addAttribute("artistLogin", artistLogin);
			}
		}
		return result;
	}
	
	
	/** 은행리스트보내주기
	 * @return 은행리스트
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
	
	
	/** 작가신청
	 * @param artist : 작가정보
	 * @param inputArtistPortfolio : 입력받은 포트폴리오 파일
	 * @return
	 */
	@PostMapping("insertArtist")
	public String insertArtist(
			@ModelAttribute Member artist,
			@RequestParam("workDetail") List<String> workDetails,
			@RequestParam("inputArtistPortfolio") MultipartFile inputArtistPortfolio
			) {
		
		int result = service.insertArtist(artist, inputArtistPortfolio, workDetails);
		if(result > 0) {
			return "redirect:/";
		} else {
			return "redirect:/member/myPage/artistRegistration";
		}
	}
	
	
	/** 1:1문의 페이지로 이동
	 * @return
	 */
	@GetMapping("onequestion")
	public String onequestion(
			@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			@RequestParam(name="cp", required = false, defaultValue = "1") int currentPage,
			Model model) {
		
		int memberNo = 0;
		if(memberLogin != null) {
			memberNo = memberLogin.getMemberNo();
		} else if (artistLogin != null){
			memberNo = artistLogin.getMemberNo();
		} else {
			return "redirect:/main";
		}
		
		// 1:1문의내역, 문의카테고리, 페이지네이션 얻어오기
		Map<String, Object> map = service.onequestion(memberNo, currentPage);
		
		model.addAttribute("pagination", map.get("pagination"));
		model.addAttribute("categoryList", map.get("categoryList"));
		model.addAttribute("questionList", map.get("questionList"));
		
		return "myPage/onequestion";
	}
	
	/** 1:1 문의사항 등록
	 * @param question
	 * @return
	 */
	@PostMapping("insertQuestion")
	@ResponseBody
	public int insertQuestion(@RequestBody Notice question) {
		return service.insertQuestion(question);
	}
	
	
	/** 1:1 문의사항 삭제
	 * @param questionNo
	 * @return
	 */
	@GetMapping("deleteQuestion")
	@ResponseBody
	public int deleteQuestion(@RequestParam("questionNo") int questionNo) {
		return service.deleteQuestion(questionNo);
	}
	
	
	/** 리스트최신화용
	 * @param map { "memberNo" : memberNo, "listType" : listType, "cp" : cp }
	 * @return { "listType" : listType, "getList" : getList, "getPagination" : getPagination }
	 */
	@PostMapping("paginationCall")
	@ResponseBody
	public Map<String, Object> paginationCall(
			@RequestBody Map<String, String> map){
		return service.paginationCall(map);
	}
	
	
	/** 현재 입찰가 얻어오기
	 * @param pieceNo
	 * @return
	 */
	@GetMapping("getEndprice")
	@ResponseBody
	public String getEndprice(@RequestParam("pieceNo") int pieceNo) {
		return service.getEndprice(pieceNo);
	}
	
	
	/** 작가 은행코드, 은행이름, 계좌번호 알아오기
	 * @param memberNo
	 * @return
	 */
	@PostMapping("getArtistBank")
	@ResponseBody
	public Member getArtistBank(@RequestBody int memberNo) {
		return service.getArtistBank(memberNo);
	}
	
	/** 작가 계좌번호 변경
	 * @param member
	 * @return
	 */
	@PostMapping("setArtistBank")
	@ResponseBody
	public int setArtistBank(@RequestBody Member member) {
		return service.setArtistBank(member);
	}
	
	
	/** 작가 프로필사진 요청url 수정
	 * @param artist
	 * @return
	 */
	@PostMapping("setArtistProfile")
	@ResponseBody
	public int updateArtist(
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			Model model,
			@RequestBody Member artist) {
		int result = service.setArtistProfile(artist);
		if(result > 0) {
			artist.setArtistProfile(artist.getArtistProfile());
			model.addAttribute("artistLogin", artist);
		}
		return result;
	}
	
	
	/** 작가 월별 매출액 확인
	 * @param map 요청 회원번호, 요청 월
	 * @return
	 */
	@PostMapping("getSalesConfirmation")
	@ResponseBody
	public Map<String, Object> getSalesConfirmation(
			@RequestBody Map<String, String> map) {
		
		int memberNo = Integer.parseInt( map.get("memberNo") );
		String selectedMonth = map.get("selectedMonth");
		
		// 월별 작가 판매작품 및 총액
		Map<String, Object> resultMap = service.getSalesConfirmation(memberNo, selectedMonth);
		
		return resultMap;
	}
	
	
	/** 회원 구매목록 불러오기
	 * @param memberNo
	 * @param cp
	 * @return
	 */
	@GetMapping("getPurchases")
	@ResponseBody
	public List<Piece> getPurchases(
			@RequestParam("memberNo") int memberNo,
			@RequestParam("currentPage") int cp){
		
		return service.getPurchases(memberNo, cp);
	}
	
	
	@GetMapping("siteMemberGoogbyeEndByeBye")
	public String siteMemberGoogbyeEndByeBye(
			@SessionAttribute(name = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(name = "artistLogin", required = false) Member artistLogin,
			SessionStatus status,
			RedirectAttributes ra) {
		
		int memberNo = 0;
		if(memberLogin != null) {
			memberNo = memberLogin.getMemberNo();
		} else if (artistLogin != null){
			memberNo = artistLogin.getMemberNo();
		} else {
			return "redirect:/main";
		}
		
		int result = service.deleteMember(memberNo);
		String path = "";
		
		if(result > 0) {
			ra.addFlashAttribute("message", "이용해 주셔서 감사합니다.");
			path = "redirect:/member/login";
			status.setComplete();
		} else {
			ra.addFlashAttribute("message", "다시 시도해 주십시오.");
			path = "redirect:/member/myPage";
		}
		
		return path;
	}
	
}
