package edu.kh.plklj.notification.service;

import org.springframework.stereotype.Service;

import edu.kh.plklj.notification.mapper.NotificationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
	private final NotificationMapper mapper;
	
}
