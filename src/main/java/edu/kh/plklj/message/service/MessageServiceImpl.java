package edu.kh.plklj.message.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.sms.mapper.SmsMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.annotation.PostConstruct;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Slf4j
@Service
@PropertySource("classpath:/config.properties")
public class MessageServiceImpl implements MessageService {

	@Autowired
	private SmsMapper mapper;
	
//	@Autowired
//	private DefaultMessageService messageService;
	
//    final DefaultMessageService messageService;

    @Value("${coolsms.apikey}")
    private String apiKey;

    @Value("${coolsms.apisecret}")
    private String apiSecret;

    @Value("${coolsms.fromnumber}")
    private String fromNumber;

    // Spring에서 필드가 초기화된 후 CoolSMS 서비스를 초기화
//    @PostConstruct
//    public void initializeCoolSMSService() {
//    	DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
//    	this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
//    }

    @Override
    public int sendSMS(int memberNo) {
    	
//    	Member member = mapper.getSmsMember(memberNo);
//    	DefaultMessageService coolSMSService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
//    	
//        Message message = new Message();
//        message.setFrom(fromNumber);      // 발신 번호
//        message.setTo(member.getMemberPhone());    // 수신 번호
//        message.setText(member.getMemberName()+"님의 작가 신청이 거절 되었습니다.");    // 메시지 내용
//
//        try {
//            // 메시지 전송
//            SingleMessageSentResponse response = coolSMSService.sendOne(new SingleMessageSendingRequest(message));
//            log.info("Message sent successfully. Message ID: " + response.getMessageId());
//            return 1;
//        } catch (Exception e) {
//            e.printStackTrace();
//            log.info("Failed to send message. Error: " + e.getMessage());
//            return 0;
//        }
    	DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    	Member member = mapper.getSmsMember(memberNo);
    	Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
    	message.setFrom(fromNumber);      // 발신 번호
    	message.setTo(member.getMemberPhone());    // 수신 번호
    	message.setText("[화사:愛:화공]입니다." + member.getMemberName()+"님의 작가 신청이 승인되지 않아 안내드립니다.");    // 메시지 내용

        try {
          // 메시지 전송
    	messageService.send(message);	
      } catch (Exception e) {
          e.printStackTrace();
          log.info("Failed to send message. Error: " + e.getMessage());
          return 0;
      }
        return 1;
    }

	
}
