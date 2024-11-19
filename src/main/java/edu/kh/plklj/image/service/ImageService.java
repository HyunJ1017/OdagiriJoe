package edu.kh.plklj.image.service;

import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

	String updateProfile(MultipartFile image, String fileName);
	
	String updatePiece(MultipartFile image, String fileName);

	byte[] getProfile(String filename);

	byte[] getPiece(String filename);

	int deleteImage();

}
