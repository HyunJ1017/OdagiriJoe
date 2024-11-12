package edu.kh.plklj.artists.service;

import org.springframework.stereotype.Service;

import edu.kh.plklj.artists.mapper.artistsMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class artistsServiceImpl implements artistsService{
	private final artistsMapper mapper;
}
