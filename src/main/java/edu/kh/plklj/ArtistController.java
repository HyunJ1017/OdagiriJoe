package edu.kh.plklj;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/artist")
@RequiredArgsConstructor
public class ArtistController {

	/** 작가 목록 조회 페이지 이동
	 * @return
	 */
	@GetMapping("/artistList")
	public String artistList() {
		return "artist/artistList";
	}
	
	/** 작가 상세 조회
	 * 
	 */
	@GetMapping("/artistDetail")
	public String artistDetail() {
		return "artist/artistDetail";
	}
	
}
