package edu.kh.plklj.chatbot.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.plklj.chatbot.service.ChatbotService;
import edu.kh.plklj.main.dto.Member;
import lombok.RequiredArgsConstructor;

@RequestMapping("chatbot")
@SessionAttributes({"memberLogin", "artistLogin"})
@RequiredArgsConstructor
@Controller
public class ChatbotController {

    private final ChatbotService chatbotService;
    
    
    @PostMapping("/send")
    @ResponseBody
    public Map<String, String> sendMessage(
    			@RequestBody Map<String, String> request,
    			@SessionAttribute(value = "memberLogin", required = false) Member memberLogin,
   		    @SessionAttribute(value = "artistLogin", required = false) Member artistLogin
    		) {
    	
    		// 로그인 정보 확인
	    	int loginNo = (memberLogin != null) ? memberLogin.getMemberNo() : (artistLogin != null) ? artistLogin.getMemberNo() : 0;
    	
    		// 클라이언트 메시지 값 받아오기
        String userMessage = request.get("message");
        
        // 메시지 값 응답
        String botResponse = chatbotService.processMessage(userMessage, loginNo);
        
        Map<String, String> response = new HashMap<>();
        
        response.put("response", botResponse);

        return response;
    }
    
    
   
}
