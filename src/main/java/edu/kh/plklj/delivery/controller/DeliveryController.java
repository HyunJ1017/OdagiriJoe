package edu.kh.plklj.delivery.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.delivery.service.DeliveryService;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.manage.dto.Manage;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("delivery")
public class DeliveryController {
	private final DeliveryService service;

	/* 배송 리스트 조회 */
	@GetMapping("main")
	public String selectdeliveryList(@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
			@SessionAttribute(value = "artistLogin", required = false) Member artistLogin, Model model) {
		int memberNo = 0;
		if (memberLogin != null) {
			memberNo = memberLogin.getMemberNo();
		} else {
			memberNo = artistLogin.getMemberNo();
		}

		List<Manage> selectDeliveryList = service.selectDeliveryList(memberNo);
		model.addAttribute("selectDeliveryList", selectDeliveryList);
		return "/delivery/main";
	}
	

	@GetMapping("uploadDelivery")
	public String selectDelivery(Model model) {
		List<Manage> deliveryList = service.deliveryList();
		model.addAttribute("deliveryList", deliveryList); 
		return "delivery/uploadDelivery";
	}

	/* 배송 상태변경 페이지 */
//	@GetMapping("list")
//	public String deliveryList(@SessionAttribute(value="manageLogin", required = false) Manage manageLogin, Model model) {
//		List<Manage> deliveryList = service.deliveryList(manageLogin.getManageNo());
//		model.addAttribute("deliveryList", deliveryList); 
//		return"delivery/uploadDelivery" ;
//	}
	

	/* 배송 상태 변경 */
	@PutMapping("update")
	@ResponseBody
	public String updateDelevery(@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
															 @RequestBody List<Manage> delivery, Model model) {

		// 배송상태 변경
		int memberNo = memberLogin.getMemberNo();
		boolean result = service.updateDelivery(delivery);

		return "redirect:uploadDelivery";
	}

}
