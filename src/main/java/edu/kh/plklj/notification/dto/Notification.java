package edu.kh.plklj.notification.dto;

import java.time.LocalDateTime;

import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.piece.dto.Category;
import edu.kh.plklj.piece.dto.Piece;
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
	private int notiNo; // 알림 번호
	private int memberNo; // 회원 번호
	private String readCheck; // 알림 읽음 여부
	private String notiContent; // 알림 내용
	private LocalDateTime notiDate; // 알림날짜
	private String notiUrl; // 연결 페이지 주소
	private String notiType; // 알림 유형
	private int receiveMemberNo; // 알림 받는 회원
	private int sendMemberNo; // 알림 보내는 회원 
	
	private Member member; // 회원 정보
	private Piece piece; // 작품 정보
	private Category category; // 작품 카테고리

	private int notiCount; // 현재 로그인한 회원의 알림 중 읽지 않은 알림 개수
	
}
