package edu.kh.plklj.manage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.manage.service.ManageService;
import edu.kh.plklj.notice.dto.Notice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("manage")
@Slf4j
public class ManageController {

	private final ManageService service;

	@GetMapping("")
	public String managePage() {
		return "manage/manage";
	}

	// 콘텐츠 관리
	@GetMapping("getList")
	@ResponseBody
	public Map<String, Object> getReportContents(@RequestParam("code") String code,
			@RequestParam(name = "cp", required = false, defaultValue = "1") int cp) {

		return service.getSearchList(code, cp);
	}

	// 회원 정지
	@PostMapping("/suspend")
	@ResponseBody
	public String suspendMember(@RequestBody int memberNo) {
		int result = service.suspendMember(memberNo);
		if (result > 0) {
			return "정지 완료 되었습니다.";
		}

		return "정지 실패";
	}

	// 회원 탈퇴
	@PostMapping("/withdraw")
	@ResponseBody
	public String withdrawMember(@RequestBody int memberNo) {
		int result = service.withdrawMember(memberNo);
		if (result > 0) {
				return "탈퇴 완료 되었습니다.";
		}

		return "탈퇴 실패";
	}

	// 작가 정지
	@PostMapping("/suspend2")
	@ResponseBody
	public String suspendAritist(@RequestBody int memberNo) {
		int result = service.suspendAritist(memberNo);
		if (result > 0) {
			return "정지 완료 되었습니다";
		}

		return "정지 실패";
	}

	// 작가 탈퇴
	@PostMapping("/withdraw2")
	@ResponseBody
	public String withdrawArtist(@RequestBody int memberNo) {
		int result = service.withdrawArtist(memberNo);
		int result2 = service.withdrawMember2(memberNo);
		if (result > 0 && result2 > 0) {
			return "탈퇴 완료 되었습니다";
		}
		return "탈퇴 실패";
	}

	// 상세보기 신고목록 불러오기
	@GetMapping("/report/{reportNo}")
	@ResponseBody
	public List<Manage> contentsDetail(@PathVariable("reportNo") int reportNo) {
		System.out.println("reportNo :" + reportNo);
		return service.contentsDetailList(reportNo);

	}

	/**
	 * 신고목록 제거
	 * 
	 * @param reportNo
	 */
	@DeleteMapping("/report/{reportNo}")
	@ResponseBody
	public void deleteReportList(@PathVariable("reportNo") int reportNo) {
		System.out.println("reportNo :" + reportNo);
		service.deleteReportList(reportNo);
	}

	/**
	 * 게시글 삭제
	 * 
	 * @param pieceNo
	 */
	@DeleteMapping("/delete/{pieceNo}")
	@ResponseBody
	public void deletePieceList(@PathVariable("pieceNo") int pieceNo) {
		service.deletePieceList(pieceNo);
	}

	// 공지사항 작성 페이지
	@GetMapping("write")
	public String writeNotice() {
		return "manage/noticeWrite";
	}

	// 공지사항 작성하기
	@PostMapping("/noticeList")
	public String noticeList(@RequestParam("noticeTitle") String noticeTitle,
			@RequestParam("noticeContent") String noticeContent) {
		int result = service.addNoticeList(noticeTitle, noticeContent);
		if (result > 0) {
			return "redirect:/manage#noticeN";
		}
		return "redirect:/manage/noticeList";

	}

	// 공지사항 삭제하기
	@DeleteMapping("/erase/{noticeNo}")
	@ResponseBody
	public void deleteNoticeList(@PathVariable("noticeNo") int noticeNo) {

		service.deleteNoticeList(noticeNo);
	}

	// 공지사항 수정페이지 목록 불러오기
	@GetMapping("/revise2/{noticeNo}")
	public String reviseNotice(@PathVariable("noticeNo") int noticeNo, Model model) {

		Notice notice = service.getnoticeList(noticeNo).get(0); // 첫 번째 객체 가져오기

		model.addAttribute("notice", notice);

		log.debug("notice : {}", notice);

		return "manage/noticeRevise";
	}

	@PostMapping("/updateNotice")
	public String updateNotice(@RequestParam("title") String title, @RequestParam("content") String content,
			@RequestParam("noticeNo") int noticeNo) {

		service.updateNotice(title, content, noticeNo);

		return "redirect:/manage#noticeN"; // 수정 후 메인페이지로 리다이렉트
	}

	// 승인 요청 시 프로필 페이지
	@GetMapping("/confirm/{memberNo}")

	public String profileConfirm(@PathVariable("memberNo") int memberNo, Model model) {

		List<Manage> profileList = service.getprofileList(memberNo);

		for (Manage portfolio : profileList) {
			log.info(portfolio.toString());
		}

		model.addAttribute("profileList", profileList);

		return "manage/profileConfirm";
	}

	// 승인 요청 승인
	@PostMapping("/approve")
	@ResponseBody
	public String approveArtist(@RequestBody int memberNo) {
		int result = service.getapproveArtist(memberNo);
		if (result > 0) {

			return "승인 성공";
		} else {
			return "승인 실패";
		}

	}

	// 승인 요청 거절
	@PostMapping("/reject")
	@ResponseBody
	public String rejectArtist(@RequestBody int memberNo) {
		int result = service.getrejectArtist(memberNo);
		if (result > 0) {
			return "거절 성공";
		} else {
			return "거절 실패";
		}

	}

	// 1대 1문의

	@PostMapping("/answer/{questionNo}")
	@ResponseBody
	public String answerList(@PathVariable("questionNo") int questionNo, @RequestBody String questionAnswer) {

		service.answerList(questionNo, questionAnswer);
		return "답변 성공";
	}

	@PostMapping("/delete/{questionNo}")
	@ResponseBody
	public void deleteQuestionList(@PathVariable("questionNo") int questionNo) {
		service.deleteQuestionList(questionNo);
	}

}