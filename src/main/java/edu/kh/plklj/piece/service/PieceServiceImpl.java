package edu.kh.plklj.piece.service;

import org.springframework.stereotype.Service;

import edu.kh.plklj.piece.mapper.PieceMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PieceServiceImpl implements PieceService{
	private final PieceMapper mapper;
}
