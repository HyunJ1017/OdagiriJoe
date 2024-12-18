package edu.kh.plklj.auction.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.plklj.auction.mapper.AuctionMapper;
import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.piece.dto.Piece;
import edu.kh.plklj.report.dto.Report;
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
  
  
	
  /************************** 메인페이지, 예정경매 상세  **************************/
  @Override
  public Map<String, Object> auctionMain() {
  	
    Map<String, Object> result = new HashMap<>();

    // DB에서 예정 경매 리스트 조회
    List<Piece> upCommingList = mapper.upCommingList();
    
    List<Piece> currentList = mapper.currentList();
    
//    List<Piece> completedList = mapper.completedList(); 
     
    // 공통 메서드 호출로 변환
    List<Map<String, Object>> calculatedUpCommingList = upCommingList.stream()
        .map(this::calculatePieceData) // 메서드 참조
        .collect(Collectors.toList());
    
    // 진행 경매 리스트도 동일하게 변환
    List<Map<String, Object>> calculatedCurrentList = currentList.stream()
        .map(this::calculatePieceData)
        .collect(Collectors.toList());

    // 예정경매
    result.put("upCommingList", calculatedUpCommingList);
    
    // 진행경매
    result.put("currentList", calculatedCurrentList);
    
    // 종료경매
//    result.put("completedList", completedList);
    

    return result;
  }
	
	
	
  // 작품 상세 조회 (날짜 계산 포함)
  @Override
  public Map<String, Object> upComiingDetail(int pieceNo, int loginNo) {
  	
  	// 예정경매 상세 조회
  	Piece piece = mapper.upComiingDetail(pieceNo, loginNo);
  	
  	// 예정 상세 받아온 값 날짜 함수로 전달
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
  
  
  // 경매예정 신고 처리
  @Override
  public int reportInsert(Report report) {
  	return mapper.reportInsert(report);
  }
  
  
  
  /************************** 진행경매 상세 페이지 **************************/
  @Override
  public Piece currentDetail(int pieceNo) {
  	
      Piece piece = mapper.currentDetail(pieceNo);

      // 날짜 가공 - startDate
      // 날짜 가공 - startDate (10시 고정)
      LocalDateTime startDate = LocalDateTime.parse(piece.getStartDate(), FORMATTER)
                                             .withHour(10)
                                             .withMinute(0)
                                             .withSecond(0)
                                             .withNano(0);
      piece.setStartDate(startDate.format(DateTimeFormatter.ofPattern("M월 d일(E) HH:mm")));

      // 날짜 가공 - endDate (DB에서 가져온 값 사용, 10시 고정)
      if (piece.getEndDate() != null) {
          LocalDateTime endDate = LocalDateTime.parse(piece.getEndDate(), FORMATTER)
                                               .withHour(10)
                                               .withMinute(0)
                                               .withSecond(0)
                                               .withNano(0);
          piece.setEndDate(endDate.format(DateTimeFormatter.ofPattern("M월 d일(E) HH:mm")));
      } else {
          piece.setEndDate("종료일 없음");
      }

      // 금액 가공 - startPrice
      long startPrice = Long.parseLong(piece.getStartPrice());
      long hopePrice = Long.parseLong(piece.getHopePrice());
      
      long estimatedPrice = (long) (hopePrice * 1.3);

      piece.setStartPrice(String.format("%,d (KRW)", startPrice));
      piece.setHopePrice(String.format("%,d (KRW)", estimatedPrice));

      return piece;
  }
  
  
  
  
  /************************** 종료 경매 페이지 네이션  **************************/
  
  @Override
  public Map<String, Object> completedList(int cp) {
  	
  	int completedListCount = mapper.completedListCount();
  	
		log.debug("completedListCount : {}", completedListCount);
		
		Pagination pagination = new Pagination(cp, completedListCount, 10, 5);

		// ex) 현재 페이지 2 - 1 = 1
		// 1 * 5 = 5
		// 해당 인덱스 부터 게시물 가져오는 값
		int offset = (cp - 1) * pagination.getLimit();
		
		// 페이징 처리를 위해 제공하는 API
		// offset: 조회 시작 위치를 지정 (0부터 시작)
		// limit: 조회할 데이터의 개수를 지정
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		List<Piece> completedList = mapper.completedList(rowBounds);
		
		log.debug("completedList : {}", completedList);
		
		Map<String, Object> map = Map.of("completedList", completedList, "pagination", pagination);
		
		return map;
  }
  
  
	
	
  
  
  
  
  
  
  /* 날짜 계산 함수 */
  public Map<String, Object> calculatePieceData(Piece piece) {
  	
    Map<String, Object> pieceData = new HashMap<>();
    
    // 예정상세 받아온 값 Map에 할당
    pieceData.put("pieceNo", piece.getPieceNo()); 
    pieceData.put("artistNickName", piece.getArtistNickname()); 
    pieceData.put("pieceTitle", piece.getPieceTitle());
    pieceData.put("pieceRename", piece.getPieceRename());
    pieceData.put("pieceStatus", piece.getPieceStatus());

    
    // LocalDateTime startDate = LocalDateTime.now().plusSeconds(20); // 테스트를 위해 20초 뒤로 설정
    
    // START_DATE(String) → LocalDateTime 변환
    LocalDateTime startDate = LocalDateTime.parse(piece.getStartDate(), FORMATTER);
    
    // START_DATE를 오전 10시로 고정
    startDate = startDate.withHour(10).withMinute(0).withSecond(0).withNano(0);
    
    
    
    // END_DATE를 경매 시작일(startDate) 기준 하루 뒤로 설정, 오전 10시로 고정
    LocalDateTime endDate = startDate.plusDays(1)
                                     .withHour(10)
                                     .withMinute(0)
                                     .withSecond(0)
                                     .withNano(0);

    
    // 프리뷰 시작일 계산: START_DATE 기준 7일 전
    LocalDateTime previewStart = startDate.minusDays(7);

    // 현재 시간
    LocalDateTime now = LocalDateTime.now();

    // 남은 시간 계산
    // 카운트 나오게 계산하려는 코드
    // 두 시간(now와 startDate) 사이의 차이를 Duration 객체로 반환.
    long totalSeconds = java.time.Duration.between(now, startDate).getSeconds();
    long hours = totalSeconds / 3600; // 시간
    long minutes = (totalSeconds % 3600) / 60; // 분
    long seconds = totalSeconds % 60; // 초
    

    // ISO 8601 형식으로 저장 : 2024-11-28T10:00:00, 2024-11-29T10:00:00
    piece.setStartDate(startDate.toLocalDate().toString() + "T" + startDate.toLocalTime().withNano(0).toString());
    piece.setEndDate(endDate.toLocalDate().toString() + "T" + endDate.toLocalTime().withNano(0).toString());
    pieceData.put("auctionDate", piece.getStartDate());
    pieceData.put("endDate", piece.getEndDate());

    // 사용자 친화적인 경매일 표현
    // startDate: 2024-11-28T10:00:00 ->  "11월 28일(목)"
    pieceData.put("auctionDateDisplay", startDate.format(DISPLAY_FORMATTER));
    pieceData.put("endDateDisplay", endDate.format(DISPLAY_FORMATTER));

    // 프리뷰 기간 저장
    pieceData.put("previewPeriod", previewStart.format(DISPLAY_FORMATTER) + " ~ " + startDate.format(DISPLAY_FORMATTER));

    // 남은 시간 표현
    pieceData.put("remainingHours", hours);
    pieceData.put("remainingMinutes", minutes);
    pieceData.put("remainingSeconds", seconds);

    return pieceData;
}

}
