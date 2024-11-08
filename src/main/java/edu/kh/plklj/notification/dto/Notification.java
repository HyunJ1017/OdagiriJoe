package edu.kh.plklj.notification.dto;

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
public class Notification {
	
	// 알림
	private int notoNo;
	private int memberNo;
	private String readCheck;
	private String notiContent;
	
}
