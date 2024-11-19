package edu.kh.plklj.delivery.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.plklj.delivery.service.DeliveryService;
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
	@GetMapping("delivery")
	public String delivery(Model model) {
		Map<String, Object> map = service.selectDeliveryList();
		List<Manage> deliveryList = (List<Manage>)map.get("deliveryList");
//		List<Piece> priceList = (List<Piece>map.get("pieceList"));"pieceList", pieceList
		model.addAttribute("deliveryList", deliveryList );
		return ("/delivery");
	}
	
}
