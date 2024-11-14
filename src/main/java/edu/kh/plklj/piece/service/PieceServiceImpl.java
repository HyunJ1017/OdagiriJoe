package edu.kh.plklj.piece.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.plklj.piece.dto.Piece;
import edu.kh.plklj.piece.mapper.PieceMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PieceServiceImpl implements PieceService{
	private final PieceMapper mapper;
	
	@Override
	public int getsalesPieceCount() {
		return mapper.countSalesPiece();
	}
	
	@Override
	public List<Piece> getSalesPieces(int currentPage, int limit) {
		int offset = (currentPage - 1) * limit; // 현재 페이지에 따른 시작 위치 계산
		return mapper.selectSalesPiece(offset, limit);
	}
	
	@Override
	public int getCompletePieceCount() {
		return mapper.countCompletedPiece();
	}
	
	@Override
	public List<Piece> getCompletePieces(int currentPage, int limit) {
		int offset = (currentPage - 1) * limit; // 현재 페이지에 따른 시작 위치 계산
		return mapper.selectCompletedPiece(offset, limit);
	}
	

	









}
