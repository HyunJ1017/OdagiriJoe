package edu.kh.plklj.sms.dto;

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
public class SmsDto {
	private int memberNo;
	private String memberPhone;
	private String artistPhone;
	private String attistNickname;
	private String pieceTitle;
	private String sellPrice;
}
