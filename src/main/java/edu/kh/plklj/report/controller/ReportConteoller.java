package edu.kh.plklj.report.controller;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("")
@RequiredArgsConstructor
@Slf4j
public class ReportConteoller {
	private final ReportService service;

}
