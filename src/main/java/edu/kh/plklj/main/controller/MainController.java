package edu.kh.plklj.main.controller;

import java.util.List;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.main.service.MainService;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("main")
@RequiredArgsConstructor
@Slf4j
public class MainController {
	private final MainService service;
	
	// 메인 페이지 목록 조회
	@GetMapping("")
	public String main(Model model) {
		Map<String, Object> map = service.mainPage();

		List<Piece> showViewing = (List<Piece>) map.get("showViewing");
		List<Piece> onlineGallery = (List<Piece>) map.get("onlineGallery");
		List<Piece> auctions = (List<Piece>) map.get("auctions");
		
		model.addAttribute("showViewing", showViewing);
		model.addAttribute("onlineGallery", onlineGallery);
		model.addAttribute("auctions", auctions);

		return "common/main";
	}
	
	// 검색 목록 조회
	@GetMapping("search")
	public String search(@RequestParam(value = "keyword", required = false) String listSearch, Model model) {
		if (listSearch == null || listSearch.trim().isEmpty()) {
			model.addAttribute("errorMessage", "검색 키워드를 입력해주세요.");
			return "common/search"; // 검색 결과 없는 화면 처리
		}
		
		Map<String, Object> map = service.listSearch(listSearch);
		List<Piece> searchList = (List<Piece>) map.get(listSearch);
		
		if (searchList == null || searchList.isEmpty()) {
			model.addAttribute("errorMessage", "검색 결과가 없습니다.");
		} else {
			model.addAttribute("searchList", searchList);
		}
//		model.addAttribute(searchList);
		
		return "common/search";
	}
	
	
	// 아티스트 목록 조회 페이지 이동
	@GetMapping("artist")
	public String artistList() {
		return "artist/artistList";
	}
	
	
}
