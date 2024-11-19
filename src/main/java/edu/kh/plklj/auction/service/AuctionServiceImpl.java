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
  public Map<String, Object> ongoingDetail(int pieceNo, int loginNo) {
  	
  	Piece piece = mapper.ongoingDetail(pieceNo, loginNo);
    Map<String, Object> pieceData = calculatePieceData(piece);

    // 추가로 likeCheck를 포함
    int likeCheck = mapper.getLikeCheck(pieceNo, loginNo);
    pieceData.put("likeCheck", likeCheck);
    
    return pieceData;
  }
  
  
  
  @Override
  public Map<String, Object> pieceLike(int pieceNo, int loginNo) {
  	
  	// 1) 좋아요 누른적 있나 검사
		int result = mapper.checkPieceLike(pieceNo, loginNo);
		
		// result == 1 == 누른 적 있음
		// result == 0 == 누른 적 없음
		
		// 2. 좋아요 여부에 따라 INSERT/DELETE Mapper 호출
		int result2 = 0;
		if(result == 0) {
			result2 = mapper.insertPieceLike(pieceNo, loginNo);
		} else {
			result2 = mapper.deletePieceLike(pieceNo, loginNo);
		}
		
		// 3. INSERT, DELETE 성공 시 해당 게시글의 좋아요 개수 조회
		int count = 0;
		if(result2 > 0) {
			count = mapper.getLikeCount(pieceNo);
		} else {
			return null; // INSERT, DELETE 실패 시
		}
		
		// 4) 좋아요 결과를 Map에 저장해서 반환
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", count); // 좋아요 개수
		
		if(result == 0 ) map.put("check", "insert");
		else             map.put("check", "delete");
		
		
		return map;
  }
  
  
	
	
  private Map<String, Object> calculatePieceData(Piece piece) {
    Map<String, Object> pieceData = new HashMap<>();
    
    
    pieceData.put("pieceNo", piece.getPieceNo());
    pieceData.put("pieceTitle", piece.getPieceTitle());
    pieceData.put("pieceRename", piece.getPieceRename());

    
    // LocalDateTime startDate = LocalDateTime.now().plusSeconds(20); // 테스트를 위해 20초 뒤로 설정
    
    // START_DATE(String) → LocalDateTime 변환
    LocalDateTime startDate = LocalDateTime.parse(piece.getStartDate(), FORMATTER);
    

    // 프리뷰 시작일 계산: START_DATE 기준 7일 전
    LocalDateTime previewStart = startDate.minusDays(7);

    // 현재 시간
    LocalDateTime now = LocalDateTime.now();

    // 남은 시간 계산
    long totalSeconds = java.time.Duration.between(now, startDate).getSeconds();
    long hours = totalSeconds / 3600;
    long minutes = (totalSeconds % 3600) / 60;
    long seconds = totalSeconds % 60;
    
    

    // ISO 8601 형식으로 저장
    piece.setStartDate(startDate.toLocalDate().toString() + "T" + startDate.toLocalTime().withNano(0).toString());
    pieceData.put("auctionDate", piece.getStartDate());

    // 사용자 친화적인 경매일 표현
    pieceData.put("auctionDateDisplay", startDate.format(DISPLAY_FORMATTER));

    // 프리뷰 기간 저장
    pieceData.put("previewPeriod", previewStart.format(DISPLAY_FORMATTER) + " ~ " + startDate.format(DISPLAY_FORMATTER));

    // 남은 시간 표현
    pieceData.put("remainingHours", hours);
    pieceData.put("remainingMinutes", minutes);
    pieceData.put("remainingSeconds", seconds);

    return pieceData;
}

}
