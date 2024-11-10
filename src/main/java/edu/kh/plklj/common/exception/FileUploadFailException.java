package edu.kh.plklj.common.exception;

public class FileUploadFailException extends RuntimeException{
	public FileUploadFailException() {
		super("파일 업로드 실패");
	}
	public FileUploadFailException(String message) {
		super(message);
	}
}
