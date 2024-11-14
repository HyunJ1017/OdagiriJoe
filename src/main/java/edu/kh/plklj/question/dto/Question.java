package edu.kh.plklj.question.dto;

import com.google.auto.value.AutoValue.Builder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
	
	//공지사항 
	private int questionNo;
	private int memberNo;
	
	private String questionContent;
	private String questionDate;
	private String questionDelFl;
	private String questionAnsFl;
	private String questionAnswer;
	
	//문의분류
	private int questionCategoryNo;
	private String questionCategoryName;
	
	
}
