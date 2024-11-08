package edu.kh.plklj.report.dto;

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
public class Report {
	
	// 신고
	private int reportNo;
	private int memberNo;
	private int pieceNo;
	private String reportType;
	private String reportContent;
	private String reportDate;
	private String reportReadFl;
	private String reportDelFl;


}
