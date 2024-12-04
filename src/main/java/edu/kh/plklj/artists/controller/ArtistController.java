package edu.kh.plklj.artists.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.plklj.artists.dto.Artist;
import edu.kh.plklj.artists.service.ArtistsService;
import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.main.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("artist")
@RequiredArgsConstructor
@Slf4j
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
			@RequestParam("memberNo") int artistNo,
			Model model,
			@SessionAttribute(name = "memberLogin", required = false) Member loginMember,
      @SessionAttribute(name = "artistLogin", required = false) Member loginArtist
			) {
		
		int memberNo = (loginMember != null) ? loginMember.getMemberNo() 
        : (loginArtist != null) ? loginArtist.getMemberNo() 
        : 0;

		
		Artist artist = service.getArtistDetail(artistNo, memberNo);
		System.out.println(artist);
		model.addAttribute("artist", artist);
		return "artist/artistDetail";
	
	}
	
	/** 작가 상세조회 시 작품 목록 로드 비동기 조회
	 */
	@GetMapping("works")
	@ResponseBody
	public Map<String, Object> getArtistWorks(
			@RequestParam("memberNo") int memberNo,
			@RequestParam(value = "sort", required = false, defaultValue = "recent") String sort,
			@RequestParam(value = "order", required = false, defaultValue = "asc") String order,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp
			) {
		
		
		
		List<Map<String, Object>> works = service.getArtistWorks(memberNo, sort, order, cp);
		log.info("works : {}", works);
    int totalWorkCount = service.getArtistWorkCount(memberNo);

    Map<String, Object> response = new HashMap<>();
    response.put("works", works);
    response.put("currentPage", cp);
    response.put("totalCount", totalWorkCount);
    response.put("hasMore", (cp * 10) < totalWorkCount); // 한 페이지당 10개로 가정

    return response;
	}
	
	/** 팔로우 체크 or 해제
	 */
	@PostMapping("follow")
	@ResponseBody
	public Map<String, Object> follow(
			@RequestBody int artistNo,
			@SessionAttribute(name = "memberLogin", required = false) Member loginMember,
      @SessionAttribute(name = "artistLogin", required = false) Member loginArtist
			) {
		
		int memberNo = 0;
		
		if(loginMember == null) {
			memberNo = loginArtist.getMemberNo();
		} else {
			memberNo = loginMember.getMemberNo();
		}
		
		return service.follow(memberNo, artistNo);
	}

















}
