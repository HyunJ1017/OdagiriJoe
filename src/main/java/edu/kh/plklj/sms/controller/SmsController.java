package edu.kh.plklj.sms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import edu.kh.plklj.sms.service.SmsService;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Objects;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
@PropertySource("classpath:/config.properties")
@RequestMapping("sms")
@Controller
public class SmsController {

	@Value("${gabia.api.smsId}")
	private String smsId;
	@Value("${gabia.api.apiKey}")
	private String apiKey;
	@Value("${gabia.api.callPhoneNumber}")
	private String callPhoneNumber;
	
	
	@Autowired
	private SmsService service;
	
	
	/** 토큰 발급
	 * @return
	 * @throws IOException
	 */
	public String getToken() throws IOException{
		
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
	
	/** 인증문자 발송
	 * @param phoneNumber
	 * @param typeCode : 1:인증문자발송, 2:아이디찾기
	 * @return
	 * @throws IOException
	 */
	@GetMapping("sendSms")
	@ResponseBody
	public int sendSms(
			@RequestParam("phoneNumber") String phoneNumber,
			@RequestParam("typeCode") int typeCode
			) throws IOException {
		String token = getToken();
		String smsSendUrl = "https://sms.gabia.com/api/send/sms";
		String message;
		if(typeCode == 1) message = service.createMassage(phoneNumber);
		else {
			message = service.getIdList(phoneNumber);
			if(message == null) return 0;
		}
		String refkey = service.createAuthKey();
		
		
		String authValue =
			Base64.getEncoder().encodeToString(String.format("%s:%s", smsId,
					token).getBytes(StandardCharsets.UTF_8)); // Authorization Header 에 입력할 값입니다.

        // SMS 발송 API 를 호출합니다.
        OkHttpClient client = new OkHttpClient();

        RequestBody requestBody = new MultipartBody.Builder().setType(MultipartBody.FORM)
        .addFormDataPart("phone", phoneNumber) // 수신번호를 입력해 주세요. (수신번호가 두 개 이상인 경우 ',' 를 이용하여 입력합니다. ex) 01011112222,01033334444)
        .addFormDataPart("callback", callPhoneNumber) // 발신번호를 입력해 주세요.
        .addFormDataPart("message", message) // SMS 내용을 입력해 주세요.
        .addFormDataPart("refkey", refkey) // 발송 결과 조회를 위한 임의의 랜덤 키 값을 입력해 주세요.
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
        
        /*
        for(String key : result.keySet()) {
          System.out.printf("%s: %s%n", key, result.get(key));
        }
        */
        if(result.get("code").equals("200")) {
        	return 1;
        }
		
		return 0;
	}
	
	
	/** 인증번호 확인
	 * @param authKey
	 * @return 일치 : 1, 만료or전화번호틀림 : 0, 틀림 : 2
	 */
	@GetMapping("authKeyCheck")
	@ResponseBody
	public int authKeyCheck(
			@RequestParam("authKey") String authKey,
			@RequestParam("phoneNumber") String phoneNumber) {
		return service.authKeyCheck(phoneNumber, authKey);
	}
	
	
	
}
