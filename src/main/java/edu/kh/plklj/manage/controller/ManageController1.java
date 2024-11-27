package edu.kh.plklj.manage.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.plklj.manage.service.DashboardService;
import lombok.RequiredArgsConstructor;

@RequestMapping("dashboard")
@RestController
@RequiredArgsConstructor
public class ManageController1 {
	
	private final DashboardService service;
	
	@PostMapping("/incrementVisitor")
  public ResponseEntity<Void> incrementVisitor() {
      service.incremrntVisitorCount();
     return ResponseEntity.ok().build();
  }

  @GetMapping("/visitorData")
  public ResponseEntity<Map<String, Integer>> getVisitorData() {
  		Map<String, Integer> visitorData = service.getVisitorCountForLastWeek();
  		return ResponseEntity.ok(visitorData);
  		
  }
	
}
















