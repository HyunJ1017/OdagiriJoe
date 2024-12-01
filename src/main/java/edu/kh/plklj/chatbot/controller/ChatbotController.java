package edu.kh.plklj.chatbot.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.plklj.chatbot.service.ChatbotService;
import lombok.RequiredArgsConstructor;

@RequestMapping("chatbot")
@RequiredArgsConstructor
@Controller
public class ChatbotController {

    private final ChatbotService chatbotService;
    
    
    @GetMapping("main")
    public String main() {
    	
    	return "chatbot/chatbotMain";
    }
    

    @PostMapping("/send")
    @ResponseBody
    public Map<String, String> sendMessage(@RequestBody Map<String, String> request) {
    	
    		// 클라이언트 메시지 값 받아오기
        String userMessage = request.get("message");
        
        // 메시지 값 응답
        String botResponse = chatbotService.processMessage(userMessage);

        
        Map<String, String> response = new HashMap<>();
        
        response.put("response", botResponse);

        return response;
    }
    
    
   
}
