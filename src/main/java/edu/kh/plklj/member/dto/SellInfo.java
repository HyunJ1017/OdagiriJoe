package edu.kh.plklj.member.dto;

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
public class SellInfo {
	private String artistNickname;
	private String pieceTitle;
	private String pieceType;
	private String payAmount;
	private String payDate;
	private String priceReg;
}
