package edu.kh.plklj.manage.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("dashboard")
@RestController
public class ManageController1 {

	
	@GetMapping("data")
	public Map<String, Object> getDashboardData(
			@RequestParam String type
			) {
		
		Map<String, Object> map = new HashMap<>();
		
		// 그래프 데이터
		List<String> labels = Arrays.asList("2024-11-20", "2024-11-21", "2024-11-22");
		List<Integer> data;
		if("vistor".equals(type)) {
			data = Arrays.asList(10,20,15);
		} else if ("charge".equals(type)) {
			data = Arrays.asList(5,10,8); 
		} else {
			data = Arrays.asList(7,14,11);
		}
		
		// 테이블 데이터
		List<List<Object>> tableData = Arrays.asList(
				Arrays.asList("2024-11-20", 10, "100,000원", 20),
				Arrays.asList("2024-11-21", 15, "150,000원", 30)
		);
		
		// 응답 데이터 구성
		map.put("chargeData", Map.of("labels", labels, "data", data));
		map.put("tableData", tableData);
		
		return map;
	}















}
