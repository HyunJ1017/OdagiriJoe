package edu.kh.plklj.common.aop;

import org.aspectj.lang.annotation.Pointcut;

public class PointCutBundle {

	// 모든 컨트롤러 지정
	@Pointcut("execution(* edu.kh.plklj..*Controller*.*(..))")
	public void controllerPointcut() {}
	
	// 모든 ServiceImpl 지정
	@Pointcut("execution(* edu.kh.plklj..*ServiceImpl*.*(..))")
	public void serviceImplPointcut() {}
	
}
