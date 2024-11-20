package edu.kh.plklj.image.service;

import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;

import edu.kh.plklj.image.mapper.ImageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@PropertySource("classpath:/config.properties")
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
	
	private final ImageMapper mapper;
	private final Bucket bucket;
	private final StorageClient storage;
	
	@Value("${firebase.piece.prePath}")
	private String piecePrePath;
	
	@Value("${firebase.profile.prePath}")
	private String profilePrePath;
	
	@Value("${firebase.file.appPath}")
	private String appPath;
	
	
	// 프로필 저장
	@Override
	public String updateProfile(MultipartFile image, String fileName) {
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
	        
		    // https://firebasestorage.googleapis.com/v0/b/ 프로젝트ID .firebasestorage.app/o/ 파일경로 / 파일명$.확장자 ?alt=media
            return profilePrePath + fileName + appPath;
	        
	    } catch (Exception e) {
	        log.error("profile upload failed", e);
	        throw new RuntimeException("ErrorCode.IMAGE_UPLOAD_FAILED");
	    }
	}


	
	// 작품 저장
	@Override
	public String updatePiece(MultipartFile image, String fileName) {
		String blob = "piece/" + fileName;
	    try {
	        // 기존 파일 삭제
	        Blob existingBlob = bucket.get(blob);
	        if (existingBlob != null) {
	            existingBlob.delete();
	        }

	        // InputStream으로 파일 업로드
	        try (InputStream inputStream = image.getInputStream()) {
	        	existingBlob = bucket.create(blob, inputStream, image.getContentType());
	        }
	        
		    // https://firebasestorage.googleapis.com/v0/b/ 프로젝트ID .firebasestorage.app/o/ 파일경로 / 파일명$.확장자 ?alt=media
	        return piecePrePath + fileName + appPath;
	        
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
		Blob blob = bucket.get("piece/" + filename);
		if (blob == null) {
			throw new RuntimeException("File not found");
		}
		return blob.getContent();
	}
	
	// 작품 조회 후 삭제하기
	@Override
	public int deleteImage() {
		
		int count = 0;
		
		List<String> fileUrlList = mapper.selectFileUrlList();
		
		// 정규식으로 DB에서 파일 blob 뽑아오기
		Set<String> fileBlobs = new HashSet<>();
		for (String url : fileUrlList) {
            String decodedUrl = URLDecoder.decode(url, StandardCharsets.UTF_8);
            String filename = extractFilename(decodedUrl);
            fileBlobs.add(filename);
        }
		
		
	    try {
	    	
	    	// 파일 목록 가져오기
	        Iterable<Blob> blobs = storage.bucket("odagirijoe-3e3a4.firebasestorage.app").list().iterateAll();

	        // 파일 목록 출력
	        for (Blob blob : blobs) {
	            
	            if(fileBlobs.contains(blob.getName()) == false) {
	            	blob.delete();
	            	count ++;
	            }
	        }
	        
	    } catch (Exception e) {
	        log.error("profile upload failed", e);
	        throw new RuntimeException("ErrorCode.IMAGE_UPLOAD_FAILED");
	    }
		return count;
	}
	
	// 정규식으로 DB에서 파일 blob 뽑아오기
	private static String extractFilename(String url) {
		Pattern pattern = Pattern.compile(".*/(piece/|portfolio/|profile/)([^/?]+)");
        Matcher matcher = pattern.matcher(url);

        if (matcher.find()) {
            return matcher.group(1) + matcher.group(2);
        } else {
            return "No filename found";
        }
	}

}
