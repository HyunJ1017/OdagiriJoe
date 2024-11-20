package edu.kh.plklj.bid.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BidRequest {
	
 private int pieceNo;
 private int memberNo;
 private double bidPrice;

}