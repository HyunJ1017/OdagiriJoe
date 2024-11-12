package edu.kh.plklj.howTo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("howTo")
@Controller
public class HowToController {
			
	@GetMapping("main")
	public String main() {
		
		return "howto/howToMain";
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
	
	
	
	

}
