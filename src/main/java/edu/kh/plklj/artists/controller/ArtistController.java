package edu.kh.plklj.artists.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.plklj.artists.dto.Artist;
import edu.kh.plklj.artists.service.ArtistsService;
import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.main.dto.Member;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("artist")
@RequiredArgsConstructor
public class ArtistController {

	private final ArtistsService service;
	
	/** 작가 목록 조회 페이지 이동
	 * @return
	 */
	@GetMapping("artistList")
	public String artistList() {
		return "artist/artistList";
	}
	
	@GetMapping("list")
	@ResponseBody
	public Map<String, Object> getArtists(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp
			) {
		
		// 신진 작가 (최근 등록된 작가 5명)
		List<Artist> rookieArtists = service.getRookieArtists(cp, 5);
		
		// 인기 작가 (팔로우 많은 작가 5명)
		List<Artist> popularArtists = service.getPopularArtists(cp, 5);
		
		// 전체 작가 목록(10명씩 페이지네이션)
		int totalArtistCount = service.getTotalArtistCount();
		Pagination pagination = new Pagination(cp, totalArtistCount, 10, 5);
		List<Artist> allArtists = service.getAllArtists(cp, totalArtistCount, pagination);
		
		// JSON 형태로 데이터 반환
		Map<String, Object> response = new HashMap<>();
		response.put("rookieArtists", rookieArtists);
		response.put("popularArtists", popularArtists);
		response.put("allArtists", allArtists);
		response.put("pagination", pagination);
		
		return response;
		
	}
	
	
	/** 작가 상세 조회
	 * 
	 */
	@GetMapping("artistDetail")
	public String artistDetail(
			@RequestParam("memberNo") int memberNo,
			Model model,
			@SessionAttribute(name = "memberLogin", required = false) Member loginMember,
      @SessionAttribute(name = "artistLogin", required = false) Member loginArtist
			) {
		
		Map<String, Integer> map = new HashMap<>();
		map.put("memberNo", memberNo);
		
		if (loginMember != null) {
			map.put("memberNo", loginMember.getMemberNo());
		} else if (loginArtist != null) {
			map.put("memberNo", loginArtist.getMemberNo());
		}
		
		Artist artist = service.getArtistDetail(map);
		
		// 가져온 작가 정보를 모델에 추가
		model.addAttribute("Artist", artist);
		
		return "artist/artistDetail";
	}
	
}
