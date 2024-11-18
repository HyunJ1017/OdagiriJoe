package edu.kh.plklj.auction.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.plklj.auction.mapper.AuctionMapper;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuctionServiceImpl implements AuctionService {
	
	// 진행,예정 리스트 조회
	private final AuctionMapper mapper;
	
	// static fianl 이므로 변수명 대문자
	// 날짜 형식 패턴 정하기
  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
  private static final DateTimeFormatter DISPLAY_FORMATTER = DateTimeFormatter.ofPattern("M월 d일(E)");
  
  
	
  @Override
  public Map<String, Object> auctionMain() {
  	
    Map<String, Object> result = new HashMap<>();

    // DB에서 예정 경매 리스트 조회
    List<Piece> upCommingList = mapper.upCommingList();

    // 공통 메서드 호출로 변환
    List<Map<String, Object>> calculatedUpCommingList = upCommingList.stream()
        .map(this::calculatePieceData) // 메서드 참조
        .collect(Collectors.toList());

    result.put("upCommingList", calculatedUpCommingList);

    return result;
  }
	
	
	
  // 작품 상세 조회 (날짜 계산 포함)
  @Override
  public Map<String, Object> ongoingDetail(int pieceNo) {
      // DB에서 단일 작품 상세 조회
      Piece piece = mapper.ongoingDetail(pieceNo);

      // 공통 날짜 계산 메서드 호출
      return calculatePieceData(piece);
  }
	
	
	
	
	
	
	//공통 날짜 계산 메서드
  private Map<String, Object> calculatePieceData(Piece piece) {
      Map<String, Object> pieceData = new HashMap<>();

      pieceData.put("pieceNo", piece.getPieceNo());
      pieceData.put("pieceTitle", piece.getPieceTitle());
      pieceData.put("pieceRename", piece.getPieceRename());

      
      // regDate(String) → LocalDateTime 변환
      LocalDateTime registerDate = LocalDateTime.parse(piece.getRegDate(), FORMATTER);

      // 프리뷰 시작 및 종료
      LocalDateTime previewStart = registerDate.plusDays(7);
      LocalDateTime previewEnd = registerDate.plusDays(17);

      
      // 현재 시간
      LocalDateTime now = LocalDateTime.now();
      
      
    	// 경매일 설정: 현재 날짜 기준으로 다음 날 14:00
      // LocalDateTime auctionDate = now.plusDays(1).withHour(14).withMinute(0).withSecond(0).withNano(0);

      // 20초 테스트 설정
      // 경매일 설정: 고정된 값으로 현재 시간 기준 20초 뒤
     LocalDateTime auctionDate = LocalDateTime.now().plusSeconds(20);
      
      // 남은 시간 계산
      long totalSeconds = java.time.Duration.between(now, auctionDate).getSeconds();
      long hours = totalSeconds / 3600; // 남은 총 시간
      long minutes = (totalSeconds % 3600) / 60; // 남은 분
      long seconds = totalSeconds % 60; // 남은 초

      // ISO 8601 형식으로 변환하여 저장
      piece.setStartDate(auctionDate.toLocalDate().toString() + "T" + auctionDate.toLocalTime().withNano(0).toString());
      pieceData.put("auctionDate", piece.getStartDate());
      
      System.out.println(piece.getStartDate());

      // 사용자 친화적인 경매일 표현
      pieceData.put("auctionDateDisplay", auctionDate.format(DISPLAY_FORMATTER) + " 14:00");

      // 남은 시간 표현
      pieceData.put("remainingHours", hours);
      pieceData.put("remainingMinutes", minutes);
      pieceData.put("remainingSeconds", seconds);

      // 프리뷰 기간 저장
      pieceData.put("previewPeriod",previewStart.format(DISPLAY_FORMATTER) + " ~ " + previewEnd.format(DISPLAY_FORMATTER));
      															


      return pieceData;
  }

}
