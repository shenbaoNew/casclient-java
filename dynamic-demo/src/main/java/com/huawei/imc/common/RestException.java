package com.huawei.imc.common;

public class RestException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private Integer code;
	private String description;

	public Integer getErrorCode() {
		return code;
	}

	public void setErrorCode(Integer errorCode) {
		this.code = errorCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
