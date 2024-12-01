package edu.kh.plklj.chatbot.service;

import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
@PropertySource("classpath:/config.properties")
public class ChatbotServiceImpl implements ChatbotService {

	// Clova Chatbot API의 Key 값
	@Value("${clova.key.secretKey}")
	private String secretKey;

	// Clova Chatbot API의 엔드포인트 URL.
	@Value("${clova.url.apiUrl}")
	private String apiUrl;

	@Override
	public String processMessage(String message) {

		System.out.println(message);

		try {
			String requestMessage = createRequestMessage(message); // 메세지 값 전달
			String signature = createSignature(requestMessage, secretKey);

			RestTemplate restTemplate = new RestTemplate();

			// HTTP 요청 헤더 설정
			org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
			headers.set("Content-Type", "application/json;UTF-8");
			headers.set("X-NCP-CHATBOT_SIGNATURE", signature);

			// HTTP 요청 본문 설정
			org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(requestMessage,
					headers);

			// POST 요청 실행
			String response = restTemplate.postForObject(apiUrl, entity, String.class);

			return parseChatbotResponse(response);

		} catch (Exception e) {
			e.printStackTrace();
			return "Error processing chatbot request.";
		}
	}

	private String createRequestMessage(String message) {

		// 요청 메시지를 구성하는 JSON 객체 생성
		JSONObject obj = new JSONObject();

		// API 버전 v2
		obj.put("version", "v2");
		// 사용자를 구분하는 고유 ID. 여기서는 "unique_user_id"로 고정.
		obj.put("userId", "unique_user_id");
		// 현재 시간을 밀리초 단위로 추가.
		obj.put("timestamp", System.currentTimeMillis());

		// 명시적으로 웰컴 메시지 요청인지 확인
		String event = (message == null || message.trim().isEmpty()) ? "open" : "send"; // "open"은 API 문서에서 권장
		obj.put("event", event);

		// 일반 메시지 전송인 경우 bubbles 추가
		if ("send".equals(event)) {
			JSONObject bubblesObj = new JSONObject();
			bubblesObj.put("type", "text");

			JSONObject dataObj = new JSONObject();
			dataObj.put("description", message);
			bubblesObj.put("data", dataObj);

			JSONArray bubblesArray = new JSONArray();
			bubblesArray.put(bubblesObj);

			obj.put("bubbles", bubblesArray);
		}

		return obj.toString();
	}

	private String createSignature(String message, String secretKey) throws Exception {

		System.out.println("Request Message for Signature: " + message); // 디버깅용 출력

		// HMAC-SHA256 서명에 사용할 비밀 키 객체 생성.
		SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");

		// HmacSHA256 알고리즘을 사용하는 Mac 객체 생성 및 초기화.
		Mac mac = Mac.getInstance("HmacSHA256");

		// 메시지를 바이트 배열로 변환하여 HMAC-SHA256 실행
		mac.init(signingKey);

		// 입력 메시지(message)를 HMAC-SHA256으로 서명.
		byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));

		// 생성된 HMAC 서명을 Base64로 인코딩하여 반환.
		return Base64.getEncoder().encodeToString(rawHmac);
	}

	private String parseChatbotResponse(String response) {

		try {
			System.out.println("Clova API Response: " + response); // 디버깅용 출력

			JSONObject jsonObj = new JSONObject(response);

			JSONArray bubbles = jsonObj.getJSONArray("bubbles");

			if (bubbles.length() > 0) {
				JSONObject bubble = bubbles.getJSONObject(0);
				JSONObject data = bubble.getJSONObject("data");
				return data.getString("description");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "No response from chatbot.";
	}

}
