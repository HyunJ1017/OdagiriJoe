package edu.kh.plklj.image.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import edu.kh.plklj.image.service.ImageService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("images")
@RequiredArgsConstructor
public class ImageController {
	
	private final ImageService service;
	
	/** 대표이미지삽입
	 * 
	 * DB에 저장될 작품이름
	 * /images/profile/profile작품번호.확장자
	 * (ex: /images/profile/profile15.jpg)
	 * 
	 * @param image : 이미지파일
	 * @param fileName : profile15.jpg 형태로 넘겨받기
	 * @return
	 * @throws IOException
	 */
	@PostMapping("profile")
	@ResponseBody
    public int updateProfile(@RequestParam("image") MultipartFile image,
			@RequestParam("fileName") String fileName) throws IOException {
        return service.updateProfile(image, fileName );
    }
	
	/** 작품이미지삽입
	 * 
	 * 작품 DB에 삽입하고 서비스에서 임폴트하여 호출하기
	 * 
	 * DB에 저장될 작품이름
	 * /images/piece/piece작품번호.확장자
	 * (ex: /images/piece/piece16.jpg)
	 * 
	 * @param image : 이미지파일
	 * @param fileName : piece16.jpg 형태로 넘겨받기
	 * @return
	 * @throws IOException
	 */
	@PostMapping("piece")
	@ResponseBody
	public int updatePiece(@RequestParam("image") MultipartFile image,
			@RequestParam("fileName") String fileName) throws IOException {
		return service.updatePiece(image, fileName );
	}
	
	/** 대표작품 불러오기
	 * @param filename
	 * @return
	 */
	@GetMapping("/profile/{filename}")
	public ResponseEntity<byte[]> downloadProfile(@PathVariable("filename") String filename) {
        byte[] content = service.getProfile(filename);  // byte[]로 반환

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);  // 이미지의 MIME 타입 (예: image/jpeg)
        headers.setContentLength(content.length);

        return new ResponseEntity<>(content, headers, HttpStatus.OK);
    }
	
	/** 작품이미지 불러오기
	 * @param filename
	 * @return
	 */
	@GetMapping("/piece/{filename}")
	public ResponseEntity<byte[]> downloadPiece(@PathVariable("filename") String filename) {
		byte[] content = service.getPiece(filename);  // byte[]로 반환
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);  // 이미지의 MIME 타입 (예: image/jpeg)
		headers.setContentLength(content.length);
		
		return new ResponseEntity<>(content, headers, HttpStatus.OK);
	}

}
