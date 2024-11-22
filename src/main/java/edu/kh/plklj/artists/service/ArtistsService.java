package edu.kh.plklj.artists.service;

import java.util.List;
import java.util.Map;

import edu.kh.plklj.artists.dto.Artist;
import edu.kh.plklj.common.util.Pagination;

public interface ArtistsService {

	List<Artist> getRookieArtists(int cp, int limit);

	List<Artist> getPopularArtists(int cp, int limit);

	int getTotalArtistCount();

	List<Artist> getAllArtists(int cp, int totalArtistCount, Pagination pagination);


	List<Artist> getArtistWorks(int memberNo, String sort, String order);

	Map<String, Object> follow(int memberNo, int artistNo);


	Artist getArtistDetail(int artistNo, int memberNo);


	

}
