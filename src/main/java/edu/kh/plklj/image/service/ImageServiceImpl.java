package edu.kh.plklj.image.service;

import java.io.InputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
	
	private final Bucket bucket;
	
	// 프로필 저장
	@Override
	public int updateProfile(MultipartFile image, String fileName) {
	    String blob = "profile/" + fileName;
	    try {
	        // 기존 파일 삭제
	        Blob existingBlob = bucket.get(blob);
	        if (existingBlob != null) {
	            existingBlob.delete();
	        }

	        // InputStream으로 파일 업로드
	        try (InputStream inputStream = image.getInputStream()) {
	            bucket.create(blob, inputStream, image.getContentType());
	        }

	        return 1;
	    } catch (Exception e) {
	        log.error("profile upload failed", e);
	        throw new RuntimeException("ErrorCode.IMAGE_UPLOAD_FAILED");
	    }
	}
	
	// 작품 저장
	@Override
	public int updatePeice(MultipartFile image, String fileName) {
		String blob = "peice/" + fileName;
		try {
			// 기존 파일 삭제
			Blob existingBlob = bucket.get(blob);
			if (existingBlob != null) {
				existingBlob.delete();
			}
			
			// InputStream으로 파일 업로드
			try (InputStream inputStream = image.getInputStream()) {
				bucket.create(blob, inputStream, image.getContentType());
			}
			
			return 1;
		} catch (Exception e) {
			log.error("profile upload failed", e);
			throw new RuntimeException("ErrorCode.IMAGE_UPLOAD_FAILED");
		}
	}
	
	// 프로필 불러오기
	@Override
	public byte[] getProfile(String filename) {
	    Blob blob = bucket.get("profile/" + filename);
	    if (blob == null) {
	        throw new RuntimeException("File not found");
	    }
	    return blob.getContent();
	}
	
	// 작품 불러오기
	@Override
	public byte[] getPiece(String filename) {
		Blob blob = bucket.get("peice/" + filename);
		if (blob == null) {
			throw new RuntimeException("File not found");
		}
		return blob.getContent();
	}
	

}
