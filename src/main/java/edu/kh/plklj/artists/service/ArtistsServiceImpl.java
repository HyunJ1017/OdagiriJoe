package edu.kh.plklj.artists.service;

import org.springframework.stereotype.Service;

import edu.kh.plklj.artists.mapper.ArtistsMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArtistsServiceImpl implements ArtistsService{
	private final ArtistsMapper mapper;
}
