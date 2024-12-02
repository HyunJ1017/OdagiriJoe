package edu.kh.plklj.message.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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

	// 문자 전송 API
	@PostMapping("/send")
	@ResponseBody
	public String sendRejectionMessage(@RequestBody int memberNo) {

	    // 문자 전송
	    int result = messageService.sendSMS(memberNo); // 문자 전송 서비스 호출
	    if(result > 0) return "거절 및 문자 전송 성공";
	    else return "실패";
	}
	
	

}