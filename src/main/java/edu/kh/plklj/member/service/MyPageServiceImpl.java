package edu.kh.plklj.member.service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;

import edu.kh.plklj.main.dto.BankCode;
import edu.kh.plklj.main.dto.Member;
import edu.kh.plklj.member.mapper.LogInMapper;
import edu.kh.plklj.member.mapper.MyPageMapper;
import edu.kh.plklj.notice.dto.Notice;
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
	public Map<String, Object> onequestion(int memberNo) {
		
		return null;
	}
	
}
