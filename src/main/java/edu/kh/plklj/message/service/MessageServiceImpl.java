package edu.kh.plklj.message.service;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
@PropertySource("classpath:/config.properties") 
public class MessageServiceImpl implements MessageService {

    private DefaultMessageService coolSMSService;

    @Value("${coolsms.apikey}")
    private String apiKey;

    @Value("${coolsms.apisecret}")
    private String apiSecret;

    @Value("${coolsms.fromnumber}")
    private String fromNumber;

    // Spring에서 필드가 초기화된 후 CoolSMS 서비스를 초기화
    @PostConstruct
    public void initializeCoolSMSService() {
        this.coolSMSService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    @Override
    public String sendSMS(String toPhoneNumber, String messageText) {
        Message message = new Message();
        message.setFrom(fromNumber);      // 발신 번호
        message.setTo(toPhoneNumber);    // 수신 번호
        message.setText(messageText);    // 메시지 내용

        try {
            // 메시지 전송
            SingleMessageSentResponse response = coolSMSService.sendOne(new SingleMessageSendingRequest(message));
            return "Message sent successfully. Message ID: " + response.getMessageId();
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send message. Error: " + e.getMessage();
        }
    }
}
