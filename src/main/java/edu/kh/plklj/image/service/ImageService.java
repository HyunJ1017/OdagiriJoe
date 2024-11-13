package edu.kh.plklj.image.service;

import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

	int updateProfile(MultipartFile image, String fileName);

	byte[] getProfile(String filename);

}
