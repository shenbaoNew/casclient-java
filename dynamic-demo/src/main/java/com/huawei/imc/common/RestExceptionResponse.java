package com.huawei.imc.common;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect
public class RestExceptionResponse {
	private Integer code;
	private String description;

	public RestExceptionResponse(Integer code, String description) {
		super();
		this.code = code;
		this.description = description;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
