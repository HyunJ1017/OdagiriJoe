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

      // 경매일
      LocalDateTime auctionDate = registerDate.plusDays(21).withHour(14).withMinute(0).withSecond(0);

      // 날짜를 문자열로 변환하여 저장
      pieceData.put("previewPeriod",
              previewStart.format(DISPLAY_FORMATTER) + " ~ " + previewEnd.format(DISPLAY_FORMATTER));
      pieceData.put("auctionDate", auctionDate.format(DISPLAY_FORMATTER) + " 14:00");

      return pieceData;
  }

}
