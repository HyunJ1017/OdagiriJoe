package edu.kh.plklj.common.scheduling.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;

import edu.kh.plklj.common.scheduling.mapper.ScheduleMapper;
import edu.kh.plklj.sms.dto.SmsDto;
import edu.kh.plklj.sms.service.SmsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class ScheduleServiceImpl implements ScheduleService {
	
	@Value("${gabia.api.smsId}")
	private String smsId;
	@Value("${gabia.api.apiKey}")
	private String apiKey;
	@Value("${gabia.api.callPhoneNumber}")
	private String callPhoneNumber;
	
	private final ScheduleMapper mapper;
	private final SmsService smsService;
	
	// 오늘자 시작 경매 업데이트
	@Override
	public int auctionStartScheduling() {
		return mapper.auctionStart();
	}
	
	// 오늘자 종료 경매 업데이트(낙찰품)
	@Override
	public int successfulAuction() {
		
		List<Integer> list = mapper.serchAuction();
		int count = 0;
		
		if(list.size() > 0) {
			for(int pieceNo : list) {
				int result = mapper.successfulAuction(pieceNo);
				
				// SMS 전송
				SmsDto smsDto = mapper.getSmsInfo(pieceNo);
				
				sendAuctionSms(smsDto);
				
				if(result > 0) count++;
			}
		}
		
		return count;
	}
	
	// 오늘자 종료 경매 업데이트(유찰품)
	@Override
	public int failAuction() {
		
		List<Integer> list = mapper.serchAuction2();
		int count = 0;
		
		if(list.size() > 0) {
			for(int pieceNo : list) {
				int result = mapper.failAuction(pieceNo);
				result = mapper.cellPice(pieceNo);
				if(result > 0) count++;
			}
		}
		
		return count;
	}
	
	// 오늘치 정지회원 풀어주기
	@Override
	public int prisoners() {
		return mapper.prisoners();
	}
	
	/** 경매알림문자
	 * @param smsDto
	 * @throws IOException 
	 */
	private void sendAuctionSms(SmsDto smsDto){
		String smsSendUrl = "https://sms.gabia.com/api/send/sms";
		String message;
		String phoneNumber;
		
		for(int i = 0; i < 2; i++) {
			if(i == 0) {
				message = String.format(
						"화사 :: 愛 :: 화공\n\n회원님이 입찰하신 작품 [%s]이 %s원에 낙찰 되셨습니다.",
						smsDto.getPieceTitle(), smsDto.getEndPrice());
				phoneNumber = smsDto.getMemberPhone();
			}
			else {
				message = String.format(
						"화사 :: 愛 :: 화공\n\n%s 작가님의 작품 %s이 %s원에 낙찰 되셨습니다.",
						smsDto.getArtistNickname(), smsDto.getPieceTitle(), smsDto.getEndPrice());
				phoneNumber = smsDto.getArtistPhone();
			}
			
			String refkey = smsService.createAuthKey();
			String token;
			try {
				token = getToken();
			
				String authValue =
						Base64.getEncoder().encodeToString(String.format("%s:%s", smsId,
								token).getBytes(StandardCharsets.UTF_8)); // Authorization Header 에 입력할 값입니다.
				
				// SMS 발송 API 를 호출합니다.
				OkHttpClient client = new OkHttpClient();
				
				RequestBody requestBody = new MultipartBody.Builder().setType(MultipartBody.FORM)
						.addFormDataPart("phone", phoneNumber) 	// 수신번호를 입력해 주세요. (수신번호가 두 개 이상인 경우 ',' 를 이용하여 입력합니다. ex) 01011112222,01033334444)
						.addFormDataPart("callback", callPhoneNumber) // 발신번호를 입력해 주세요.
						.addFormDataPart("message", message) 	// SMS 내용을 입력해 주세요.
						.addFormDataPart("refkey", refkey) 		// 발송 결과 조회를 위한 임의의 랜덤 키 값을 입력해 주세요.
						.build();
				
				Request request = new Request.Builder()
						.url(smsSendUrl)
						.post(requestBody)
						.addHeader("Content-Type", "application/x-www-form-urlencoded")
						.addHeader("Authorization", "Basic " + authValue)
						.addHeader("cache-control", "no-cache")
						.build();
				
				Response response = client.newCall(request).execute();
				
				// Response 를 key, value 로 확인하실 수 있습니다.
				HashMap<String, String> result = new
						Gson().fromJson(Objects.requireNonNull(response.body()).string(), HashMap.class);
				
				if(result.get("code").equals("200")) {
					log.info("[SMS 성공] " + phoneNumber + " / " + message);
				}
				
			} catch (IOException e) {
				log.info("[SMS 실패] " + phoneNumber + " / " + message);
				e.printStackTrace();
			}
			
		}
	}
	
	
	/** 토큰 발급
	 * @return
	 * @throws IOException
	 */
	private String getToken() throws IOException{
		
		String SMS_OAUTH_TOKEN_URL = "https://sms.gabia.com/oauth/token";
		
		String authValue =
		Base64.getEncoder().encodeToString(String.format("%s:%s", smsId,
		apiKey).getBytes(StandardCharsets.UTF_8)); // Authorization Header 에 입력할 값입니다.
		
		// 사용자 인증 API 를 호출합니다.
		OkHttpClient client = new OkHttpClient();
		
		RequestBody requestBody = new MultipartBody.Builder().setType(MultipartBody.FORM)
		  .addFormDataPart("grant_type", "client_credentials")
		  .build();
		
		Request request = new Request.Builder()
		  .url(SMS_OAUTH_TOKEN_URL)
		  .post(requestBody)
		  .addHeader("Content-Type", "application/x-www-form-urlencoded")
		  .addHeader("Authorization", "Basic " + authValue)
		  .addHeader("cache-control", "no-cache")
		  .build();
		
		  // Response 를 key, value 로 확인하실 수 있습니다.
		Response response = client.newCall(request).execute();
		HashMap<String, String> result = new
		  Gson().fromJson(Objects.requireNonNull(response.body()).string(), HashMap.class);
		
		/*
		for(String key : result.keySet()) {
		    System.out.printf("%s: %s%n", key, result.get(key));
		}
		*/
		
		return result.get("access_token");
		
	}
	
	@Override
	public int deleteVisitor() {
		return mapper.deleteVisitor();
	}
}
