package edu.kh.plklj.delivery.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.delivery.service.DeliveryService;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;


@Controller
@RequiredArgsConstructor
@RequestMapping("delivery")
public class DeliveryController {
	private final DeliveryService service;

	/* 배송 리스트 조회 */
	@GetMapping("main")
	public String selectdeliveryList(@SessionAttribute(value="memberLogin", required = false) Member memberLogin,
																	 @SessionAttribute(value="artistLogin", required = false) Member artistLogin, Model model) {
			int memberNo = 0;
			if(memberLogin != null) {
				memberNo = memberLogin.getMemberNo();
			} else {
				memberNo = artistLogin.getMemberNo();
			}
			
	    List<Manage> selectDeliveryList = service.selectDeliveryList(memberNo);
	    model.addAttribute("selectDeliveryList", selectDeliveryList);
	    return "/delivery/main";
	}

}
