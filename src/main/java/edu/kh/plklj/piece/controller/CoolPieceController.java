package edu.kh.plklj.piece.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import edu.kh.plklj.piece.service.CoolPieceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("coolPiece")
@RequiredArgsConstructor
public class CoolPieceController {

	private final CoolPieceService service;
	
	
	/** 경매불가날자 반환
	 * @return
	 */
	@GetMapping("getAuctionDate")
	public List<String> getAuctionDate() {
		return service.getAuctionDate();
	}
	
	
	/** 다음 작품번호 불러가기
	 * @return
	 */
	@GetMapping("getPieceNo")
	public int getPieceNo() {
		return service.getPieceNo();
	}
}
