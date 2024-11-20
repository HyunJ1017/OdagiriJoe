package edu.kh.plklj.artists.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import edu.kh.plklj.artists.dto.Artist;
import edu.kh.plklj.artists.mapper.ArtistsMapper;
import edu.kh.plklj.common.util.Pagination;
import io.lettuce.core.Limit;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArtistsServiceImpl implements ArtistsService{
	private final ArtistsMapper mapper;
	
	@Override
	public List<Artist> getRookieArtists(int cp, int limit) {
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		return mapper.getRookieArtists(rowBounds);
	}
	
	@Override
	public List<Artist> getPopularArtists(int cp, int limit) {
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		return mapper.getPopularArtists(rowBounds);
	}
	
	@Override
	public List<Artist> getAllArtists(int cp, int totalArtistCount, Pagination pagination) {
		int offset = (cp - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return mapper.getAllArtists(rowBounds);
	}

	
	@Override
	public int getTotalArtistCount() {
		return mapper.getTotalArtistCount();
	}
	
	
	@Override
	public Artist getArtistDetail(Map<String, Integer> map) {
		return mapper.getArtistDetail(map);
	}


	










}
