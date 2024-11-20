package edu.kh.plklj.artists.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import edu.kh.plklj.artists.dto.Artist;

@Mapper
public interface ArtistsMapper {

	List<Artist> getRookieArtists(RowBounds rowBounds);

	List<Artist> getPopularArtists(RowBounds rowBounds);

	List<Artist> getAllArtists(RowBounds rowBounds);

	int getTotalArtistCount();

	Artist getArtistDetail(Map<String, Integer> map);

	
}
