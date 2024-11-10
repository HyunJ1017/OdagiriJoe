package edu.kh.plklj.manage.service;

import org.springframework.stereotype.Service;

import edu.kh.plklj.manage.mapper.ManageMapper;
import edu.kh.plklj.notice.mapper.NoticeMapper;
import edu.kh.plklj.notice.service.NoticeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManageServiceImpl {
	private final ManageMapper mapper;

}
