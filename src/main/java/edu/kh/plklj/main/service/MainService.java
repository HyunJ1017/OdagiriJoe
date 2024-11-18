package edu.kh.plklj.main.service;

import java.util.Map;

public interface MainService {

	/** 메인 페이지 조회
	 * @return
	 */
	Map<String, Object> mainPage();

	/** 검색
	 * @param query
	 * @return
	 */
	Map<String, Object> searchList(String query);

}
