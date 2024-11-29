package edu.kh.plklj.message.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.plklj.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/api/message")
public class MessageController {

	private final MessageService messageService;

	// 생성자 주입
	public MessageController(MessageService messageService) {
		this.messageService = messageService;
	}

	/**
	 * 문자 전송 API
	 * 
	 * @param phoneNumber 수신자의 전화번호
	 * @param text        메시지 내용
	 * @return 결과 메시지
	 */
	@PostMapping("/send")
	public String sendMessage(@RequestParam String phoneNumber, @RequestParam String text) {
		return messageService.sendSMS(phoneNumber, text);
	}

}
