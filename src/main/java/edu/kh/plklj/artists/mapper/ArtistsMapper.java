package edu.kh.plklj.artists.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import edu.kh.plklj.artists.dto.Artist;

@Mapper
public interface ArtistsMapper {

	List<Artist> getRookieArtists(RowBounds rowBounds);

	List<Artist> getPopularArtists(RowBounds rowBounds);

	List<Artist> getAllArtists(RowBounds rowBounds);

	int getTotalArtistCount();
	

	List<Artist> getArtistWorks(@Param("memberNo") int memberNo, 
															@Param("sort") String sort, 
															@Param("order") String order, 
															RowBounds rowBounds);

	int checkFollow(@Param("memberNo") int memberNo,@Param("artistNo")  int artistNo);

	int insertFollow(@Param("memberNo") int memberNo,@Param("artistNo")  int artistNo);

	int deleteFollow(@Param("memberNo") int memberNo,@Param("artistNo")  int artistNo);

	int getFollowCount(int memberNo);


	Artist getArtistDetail(@Param("artistNo") int artistNo, @Param("memberNo") int memberNo);

	int getArtistWorkCount(int memberNo);

	
}
