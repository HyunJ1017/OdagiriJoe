package edu.kh.plklj.member.service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;

import edu.kh.plklj.common.util.Pagination;
import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.mapper.LogInMapper;
import edu.kh.plklj.member.mapper.MyPageMapper;
import edu.kh.plklj.notice.dto.Notice;
import edu.kh.plklj.piece.dto.Piece;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {
	
	private final MyPageMapper mapper;
	private final LogInMapper loginMapper;
	private final Bucket bucket;
	
	private final BCryptPasswordEncoder encoder;
	
	// 이름수정
	@Override
	public int updateName(Member member) {
		return mapper.updateName(member);
	}

	// 비밀번호 변경
	@Override
	public int updatePw(Map<String, String> map) {
		Member getMember =  mapper.getMember(map.get("memberNo"));
		
		if( encoder.matches( map.get("memberPw"), getMember.getMemberPw()) ) {
			getMember.setMemberPw( encoder.encode( map.get("inputPw") ) );
			return loginMapper.changePw(getMember);
		}
		
		return 0;
	}
	
	// 전화번호변경
	@Override
	public int updatePhone(Member member) {
		return mapper.updatePhone(member);
	}
	
	// 은행리스트 보내주기
	@Override
	public List<BankCode> getBankList() {
		return mapper.getBankList();
	}
	
	// 닉네임 중복검사
	@Override
	public int checkNickname(String inputNickname) {
		return mapper.checkNickname(inputNickname);
	}
	
	// 작가 등록
	@Override
	public int insertArtist(Member artist, MultipartFile inputArtistPortfolio) {
		String originalFileName = inputArtistPortfolio.getOriginalFilename();
		int index = originalFileName.lastIndexOf(".");
		String ext = originalFileName.substring(index);
		
		/*포트폴리오 저장 및 파일명 저장*/
		String blob = "portfolio/" + "portpolio" + artist.getMemberNo() + ext;
	    try {
	        // 기존 파일 삭제
	        Blob existingBlob = bucket.get(blob);
	        if (existingBlob != null) {
	            existingBlob.delete();
	        }

	        // InputStream으로 파일 업로드
	        try (InputStream inputStream = inputArtistPortfolio.getInputStream()) {
	            bucket.create(blob, inputStream, inputArtistPortfolio.getContentType());
	        }

	    } catch (Exception e) {
	        log.error("profile upload failed", e);
	        throw new RuntimeException("ErrorCode.IMAGE_UPLOAD_FAILED");
	    }
		
	    artist.setArtistPortfolio("portfolio/" + "portpolio" + artist.getMemberNo() + ext);
	    return mapper.insertArtist(artist);
	}
	
	// 1:1 문의사항 등록
	@Override
	public int insertQuestion(Notice question) {
		return mapper.insertQuestion(question);
	}
	
	// 1:1문의내역, 문의카테고리, 페이지네이션 얻어오기
	@Override
	public Map<String, Object> onequestion(int memberNo, int currentPage) {
		
		// 페이지 네이션 생성
		int listCount = mapper.getQuestionListCount(memberNo);
		Pagination pagination = new Pagination(currentPage, listCount, 10, 10);
		int limit = pagination.getLimit();
		int offset = (currentPage - 1) * limit;
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 문의 카테고리 불러오기
		List<Notice> categoryList = mapper.getCategoryList();
		
		// 1:1문의 내역 불러오기
		List<Notice> questionList = mapper.getQuestionList(memberNo, rowBounds);
		
		// 결과 담기
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("categoryList", categoryList);
		resultMap.put("questionList", questionList);
		
		return resultMap;
	}
	
	// 1:1 문의사항 삭제
	@Override
	public int deleteQuestion(int questionNo) {
		return mapper.deleteQuestion(questionNo);
	}
	
	// 팔로우, 위시리스트 얻어오기
	@Override
	public Map<String, Object> followAndWish(int memberNo) {
		
		// 페이지 네이션 생성
		int currentPage = 1;
		int listCount = mapper.getFollowListCount(memberNo);
		Pagination pagination = new Pagination(currentPage, listCount, 10, 10);
		int limit = pagination.getLimit();
		int offset = (currentPage - 1) * limit;
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		// 페이지 네이션 생성2
		int listCount2 = mapper.getWishListCount(memberNo);
		Pagination pagination2 = new Pagination(currentPage, listCount2, 3, 10);
		int limit2 = pagination2.getLimit();
		int offset2 = (currentPage - 1) * limit2;
		
		RowBounds rowBounds2 = new RowBounds(offset2, limit2);
		
		// 팔로우 불러오기
		List<Member> followList = mapper.getFollowList(memberNo, rowBounds);
		
		// 위시리스트 불러오기
		List<Piece> wishList = mapper.getWishList(memberNo, rowBounds2);
		
		// 결과 담기
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("followPagination", pagination);
		resultMap.put("wishPagination", pagination2);
		resultMap.put("followList", followList);
		resultMap.put("wishList", wishList);
		
		
		return resultMap;
	}
	
}
