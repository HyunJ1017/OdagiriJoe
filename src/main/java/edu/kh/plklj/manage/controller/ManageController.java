package edu.kh.plklj.manage.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.manage.service.ManageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
			@RequestParam(name="cp", required = false, defaultValue = "1") int cp ){
		
		return service.getSearchList(code, cp);
	}

	// 공지사항 수정 페이지
	@GetMapping("revise")
	public String reviseNotice() {
		return "manage/noticeRevise";
	}

	// 공지사항 작성 페이지
	@GetMapping("write")
	public String writeNotice() {
		return "manage/noticeWrite";
	}

	// 승인 요청 시 프로필 페이지
	@GetMapping("confirm")
	public String profileConfirm() {
		return "manage/profileConfirm";
	}

}