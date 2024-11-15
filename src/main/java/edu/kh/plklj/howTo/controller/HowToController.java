package edu.kh.plklj.howTo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.howTo.service.HowToService;
import edu.kh.plklj.question.dto.Question;
import lombok.RequiredArgsConstructor;

@RequestMapping("howTo")
@Controller
@RequiredArgsConstructor
public class HowToController {
	
	private final HowToService service;
			
	@GetMapping("main")
	public String main (
				Model model
			) {
		
		// 공지사항 리스트 조회
		List<Question> questionList = service.questionList();
		
		
		// list가 null 이거나 isEmpty()는 리스트가 비어 있는지 검사
		 if (questionList == null || questionList.isEmpty()) {
       System.out.println("questionList is empty or null");
		 }
		
		model.addAttribute("questionList", questionList);
		

    return "howto/howToMain"; 
	}
	
	
	// 공지사항 페이지 페이지네이션 리스트 조회
	@GetMapping("noticeList")
	@ResponseBody
	public Map<String, Object> noticeList(
				@RequestParam(value = "cp", required = false,	defaultValue = "1") int cp
			) {
		
		Map<String, Object> map = service.noticeList(cp);
		
		
		return map;
	}
	
	

	
	@GetMapping("info")
	public String info() {
		
		return "howto/howToAuction";
	}
	
	
	@GetMapping("bidInfo")
	public String bidInfo() {
		
		return "howto/bidInfo";
	}
	
	
	@GetMapping("word")
	public String word() {
		
		return "howto/auctionWord";
	}
	
	@GetMapping("bidmethod")
	public String bidMethod() {
		
		return "howto/bidMethod";
	}
	
	
	
	
	
	
	

}
