package edu.kh.plklj.piece.controller;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.piece.service.PieceService;
import edu.kh.plklj.report.controller.ReportConteoller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("")
@Slf4j
public class PieceController {
	private final PieceService service;
}
