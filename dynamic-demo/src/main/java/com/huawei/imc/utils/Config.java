/**
 * 
 */
package com.huawei.imc.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Administrator
 *
 */
public class Config {
	private static final Logger logger = LoggerFactory.getLogger(Config.class);

	private static final String CONFIG_PATH = Config.class.getResource("/").getPath() + "config/server.properties";

	private static Properties properties = new Properties();

	private static void load() {
		InputStream inputStream = null;
		logger.debug("CONFIG_PATH is: {}", CONFIG_PATH);
		try {
			inputStream = new FileInputStream(CONFIG_PATH);
			properties.load(inputStream);
		} catch (FileNotFoundException e) {
			logger.error("Internal configuration is not loaded.");
		} catch (IOException e) {
			logger.error("Internal configuration is not loaded.");
		} finally {
			if (null != inputStream) {
				try {
					inputStream.close();
				} catch (IOException e) {
					logger.error("Internal configuration is not loaded.");
				}
			}
		}
	}

	public static int getInt(String key, int defaultValue) {
		load();
		String valueString = properties.getProperty(key);
		try {
			return Integer.parseInt(valueString);
		} catch (NumberFormatException e) {
			return defaultValue;
		}
	}

	public static long getLong(String key, long defaultValue) {
		load();
		String valueString = properties.getProperty(key);
		try {
			return Long.parseLong(valueString);
		} catch (NumberFormatException e) {
			return defaultValue;
		}
	}

	public static boolean getBoolean(String key, boolean defaultValue) {
		load();
		String valueString = properties.getProperty(key);
		if ("true".equalsIgnoreCase(valueString)) {
			return true;
		} else if ("false".equalsIgnoreCase(valueString)) {
			return false;
		} else {
			return defaultValue;
		}
	}

	public static String getString(String key, String defaultValue) {
		load();
		String valueString = properties.getProperty(key);
		return (null == valueString || "".equals(valueString)) ? defaultValue : valueString;
	}

	public static String getValue(String key, int defaultValue) {
		load();
		return null == key ? null : properties.getProperty(key);
	}
}
