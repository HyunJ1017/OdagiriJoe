package edu.kh.plklj.notice.dto;

import edu.kh.plklj.main.dto.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Notice {

	// 공지사항 
	private int noticeNo;
	private String noticeTitle;
	private String noticeContent;
	private String noticeDate;
	private String noticeDelFl;
	
	// 문의
	private int questionNo;
	private int memberNo;
	private String questionContent;
	private String questionDate;
	private String questionDelFl;
	private String questionAnsFl;
	private String questionAnswer;

	// 문의분류
	private int questionCategoryNo;
	private String questionCategoryName;
	
	
	
	
	
}
