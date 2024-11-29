package edu.kh.plklj.common.util;

import jakarta.servlet.http.HttpServletRequest;

public class IpUtil {
	
	public static String getClientIp(HttpServletRequest req) {
		String ip = req.getHeader("X-Forwarded-For");
    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
        ip = req.getHeader("Proxy-Client-IP");
    }
    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
        ip = req.getHeader("WL-Proxy-Client-IP");
    }
    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
        ip = req.getRemoteAddr();
    }
    return ip;
	}

}
