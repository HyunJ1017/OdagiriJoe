//package edu.kh.plklj.chatbot.service;
//
//import org.json.JSONArray;
//import org.json.JSONObject;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import javax.crypto.Mac;
//import javax.crypto.spec.SecretKeySpec;
//import java.util.Base64;
//
//@Service
//public class ChatbotServiceImpl implements ChatbotService {
//
//
//    @Override
//    public String processMessage(String message) {
//        try {
//            String requestMessage = createRequestMessage(message);
//            String signature = createSignature(requestMessage, secretKey);
//
//            RestTemplate restTemplate = new RestTemplate();
//
//            // HTTP 요청 헤더 설정
//            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
//            headers.set("Content-Type", "application/json;UTF-8");
//            headers.set("X-NCP-CHATBOT_SIGNATURE", signature);
//
//            
//            // HTTP 요청 본문 설정
//            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(requestMessage, headers);
//
//            // POST 요청 실행
//            String response = restTemplate.postForObject(apiUrl, entity, String.class);
//
//            return parseChatbotResponse(response);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error processing chatbot request.";
//        }
//    }
//
//    private String createRequestMessage(String message) {
//        JSONObject obj = new JSONObject();
//        obj.put("version", "v2");
//        obj.put("userId", "unique_user_id");
//        obj.put("timestamp", System.currentTimeMillis());
//
//        JSONObject bubblesObj = new JSONObject();
//        bubblesObj.put("type", "text");
//
//        JSONObject dataObj = new JSONObject();
//        dataObj.put("description", message);
//        bubblesObj.put("data", dataObj);
//
//        JSONArray bubblesArray = new JSONArray();
//        bubblesArray.put(bubblesObj);
//
//        obj.put("bubbles", bubblesArray);
//        obj.put("event", "send");
//
//        return obj.toString();
//    }
//
//    private String createSignature(String message, String secretKey) throws Exception {
//        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
//        Mac mac = Mac.getInstance("HmacSHA256");
//        mac.init(signingKey);
//        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
//        return Base64.getEncoder().encodeToString(rawHmac);
//    }
//
//    private String parseChatbotResponse(String response) {
//        try {
//            JSONObject jsonObj = new JSONObject(response);
//            JSONArray bubbles = jsonObj.getJSONArray("bubbles");
//            if (bubbles.length() > 0) {
//                JSONObject bubble = bubbles.getJSONObject(0);
//                JSONObject data = bubble.getJSONObject("data");
//                return data.getString("description");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return "No response from chatbot.";
//    }
//}
