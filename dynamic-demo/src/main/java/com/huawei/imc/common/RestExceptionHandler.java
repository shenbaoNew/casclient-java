package com.huawei.imc.common;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

public class RestExceptionHandler implements HandlerExceptionResolver {
	private static final Logger logger = Logger.getLogger(RestExceptionHandler.class);

	public ModelAndView resolveException(
			HttpServletRequest paramHttpServletRequest,
			HttpServletResponse paramHttpServletResponse,
			Object paramObject,
			Exception paramException) {
		ObjectMapper mapper = new ObjectMapper();
		PrintWriter out;
		logger.error("Rest exception: " + paramException.getMessage());
		logger.error("stack trace: " + paramException.getStackTrace());
		try {
			out = paramHttpServletResponse.getWriter();
		} catch (IOException e) {
			logger.error("", e);
			return null;
		}

		paramHttpServletResponse.setContentType("application/json;charset=UTF-8");
		if (RestException.class.isInstance(paramException)) {
			logger.error("Rest exception", paramException);
			RestException re = (RestException) paramException;
			paramHttpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			try {
				mapper.writeValue(out, new RestExceptionResponse(re.getErrorCode(), re.getDescription()));
			} catch (Exception e) {
				logger.error("error in write rest exception to httpResponse in json format", e);
				return null;
			}
		} else {
			logger.error("Abnormal exception", paramException);
			paramHttpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			try {
				mapper.writeValue(out, new RestExceptionResponse(500, "unknown error"));
			} catch (Exception e) {
				logger.error("error in write unknown exception to httpResponse in json format", e);
				return null;
			}
		}

		ModelAndView mv = new ModelAndView();
		return mv;
	}

}
