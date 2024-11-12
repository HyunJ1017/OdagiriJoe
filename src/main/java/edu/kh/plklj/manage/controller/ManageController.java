package edu.kh.plklj.manage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.manage.service.ManageService;
import edu.kh.plklj.notification.controller.NotificationController;
import edu.kh.plklj.notification.service.NotificationService;
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

}
