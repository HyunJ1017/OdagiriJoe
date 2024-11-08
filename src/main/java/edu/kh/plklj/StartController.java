package edu.kh.plklj;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class StartController {

	@GetMapping("")
	public String mainController() {
		return "redirect:/main";
	}
	
}