package edu.kh.plklj.main.controller;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import java.util.Map;
import java.util.stream.Collectors;

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

//검색 목록 조회
	@GetMapping("/search")
	public String search(@RequestParam(value = "query", required = false) String query, Model model) {
		// 검색어가 비어 있는 경우 처리
		if (query == null || query.trim().isEmpty()) {
			model.addAttribute("errorMessage", "검색 키워드를 입력해주세요.");
			return "common/search"; // 검색 결과 없는 화면 처리
		}

		// 검색 서비스 호출
		Map<String, Object> map = service.searchList(query);

		// 검색 결과 가져오기
		List<Piece> searchList = map.containsKey(query) ? (List<Piece>) map.get(query) : Collections.emptyList();

		// 검색어를 포함하는 데이터만 필터링
		List<Piece> filteredSearchList = searchList.stream()
				.filter(piece -> piece.getPieceTitle().toLowerCase().contains(query.toLowerCase()) || // 작품 제목 검색
						piece.getArtistNickname().toLowerCase().contains(query.toLowerCase()) || // 작가 이름 검색
						piece.getPieceCategoryName().toLowerCase().contains(query.toLowerCase()) // 카테고리 검색
				).collect(Collectors.toList());

		// 필터링된 결과를 모델에 추가
		model.addAttribute("query", query);
		model.addAttribute("searchList", filteredSearchList);

		// 검색 결과가 없는 경우 처리
		if (filteredSearchList.isEmpty()) {
			model.addAttribute("errorMessage", "검색 결과가 없습니다.");
		}

		// 검색 페이지로 이동
		return "common/search";
	}
	
	// 아티스트 목록 조회 페이지 이동
	@GetMapping("artist")
	public String artistList() {
		return "artist/artistList";
	}
	
	
}
