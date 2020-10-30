package com.huawei.imc.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.bind.annotation.RestController;

import com.huawei.imc.utils.Config;

@RestController
@RequestMapping(value = "/windchill")
public class WindchillDataController {

	private static final Logger logger = Logger.getLogger(WindchillDataController.class);

	private static String WC_DOMAIN = ""; // windchill域名

	private static String USERNAME = ""; // windchill管理员账号

	private static String PASSWORD = ""; // windchill管理员密码

	static {
		WC_DOMAIN = Config.getString("WC_DOMAIN", "ptcnet.pdm.com");
		USERNAME = Config.getString("USERNAME", "wcadmin");
		PASSWORD = Config.getString("PASSWORD", "wcadmin");
	}

	@RequestMapping(value = "/test", method = RequestMethod.GET)

	public @ResponseBody Map<String, Object> getCloudInterpriseData() {

		logger.debug("test for windchill");

		Map<String, Object> result = new HashMap<String, Object>();

		result.put("hello", "windchill");

		return result;

	}

	/**
	 * 获取我的代办
	 * 
	 * @param username
	 * @param checkAccess
	 * @return
	 */
	@RequestMapping(value = "/toDoTasks", method = RequestMethod.GET)
	public @ResponseBody String getMyDoTasks(String username, String checkAccess) {
		String result = "";
		logger.debug("getMyDoTasks from windchill while username:" + username + ",checkAccess:" + checkAccess);

		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("userId", username));
		params.add(new BasicNameValuePair("checkAccess", checkAccess));

		result = getInterpriseDataFromWC(params, "MyTasksResource/toDoTasks");

		return result;

	}

	/**
	 * 获取我的已办
	 * 
	 * @param username
	 * @param checkAccess
	 * @return
	 */
	@RequestMapping(value = "/historicalTasks", method = RequestMethod.GET)
	public @ResponseBody String getMyHistoricalTasks(String username, String checkAccess, String indexpage) {
		String result = "";
		logger.debug("getMyHistoricalTasks from windchill while username:" + username + ",checkAccess:" + checkAccess);

		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("userId", username));
		params.add(new BasicNameValuePair("checkAccess", checkAccess));
		params.add(new BasicNameValuePair("indexpage", indexpage));

		result = getInterpriseDataFromWC(params, "MyTasksResource/historicalTasks");

		return result;

	}

	/**
	 * 我的检出
	 * 
	 * @param username
	 * @param checkAccess
	 * @return
	 */
	@RequestMapping(value = "/myCheckOut", method = RequestMethod.GET)
	public @ResponseBody String getMyCheckOut(String username, String checkAccess) {
		String result = "";
		logger.debug("getMyCheckOut from windchill while username:" + username + ",checkAccess:" + checkAccess);

		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("userId", username));
		params.add(new BasicNameValuePair("checkAccess", checkAccess));

		result = getInterpriseDataFromWC(params, "IndexMyObjectResource/myCheckOut");

		return result;

	}

	/**
	 * 我的更新
	 * 
	 * @param username
	 * @param checkAccess
	 * @return
	 */
	@RequestMapping(value = "/myUpdates", method = RequestMethod.GET)
	public @ResponseBody String getMyUpdates(String username, String checkAccess) {
		String result = "";
		logger.debug("getMyUpdates from windchill while username:" + username + ",checkAccess:" + checkAccess);

		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("userId", username));
		params.add(new BasicNameValuePair("checkAccess", checkAccess));

		result = getInterpriseDataFromWC(params, "IndexMyObjectResource/myUpdates");

		return result;

	}

	/**
	 * 最近访问
	 * 
	 * @param username
	 * @param checkAccess
	 * @return
	 */
	@RequestMapping(value = "/recentlyVisited", method = RequestMethod.GET)
	public @ResponseBody String getMyRecentlyVisited(String username, String checkAccess) {
		String result = "";
		logger.debug("getMyRecentlyVisited from windchill while username:" + username + ",checkAccess:" + checkAccess);

		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("userId", username));
		params.add(new BasicNameValuePair("checkAccess", checkAccess));

		result = getInterpriseDataFromWC(params, "IndexMyObjectResource/recentlyVisited");

		return result;

	}

	/**
	 * 浏览产品库
	 * 
	 * @param username
	 * @param checkAccess
	 * @return
	 */
	@RequestMapping(value = "/myPDMLinkProducts", method = RequestMethod.GET)
	public @ResponseBody String getMyPDMLinkProducts(String username, String checkAccess) {
		String result = "";
		if (checkAccess == null || "".equals(checkAccess))
			checkAccess = "false";

		logger.debug("getMyPDMLinkProducts from windchill while username:" + username + ",checkAccess:" + checkAccess);

		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("userId", username));
		params.add(new BasicNameValuePair("checkAccess", checkAccess));

		result = getInterpriseDataFromWC(params, "IndexMyObjectResource/myPDMLinkProducts");

		return result;

	}

	/**
	 * 高级搜索
	 * 
	 * @param username
	 * @param checkAccess
	 * @param name
	 *            搜索条件：名称
	 * @param number
	 *            搜索条件：编号
	 * @param searchPart
	 *            查找部件（true/false）
	 * @param searchDoc
	 *            查找图文档（true/false）
	 * @param searchDoc
	 *            当前查找的页数（默认为1）
	 * @return
	 */
	@RequestMapping(value = "/myWTObjects", method = RequestMethod.GET)
	public @ResponseBody String getMyWTObjects(String username, String checkAccess, String name, String number,
			String searchPart, String searchDoc, String indexpage) {
		String result = "";
		if (checkAccess == null || "".equals(checkAccess))
			checkAccess = "false";

		logger.debug("getMyPDMLinkProducts from windchill while username:" + username + ",checkAccess:" + checkAccess);

		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("userId", username));
		params.add(new BasicNameValuePair("checkAccess", checkAccess));
		params.add(new BasicNameValuePair("name", name));
		params.add(new BasicNameValuePair("number", number));
		params.add(new BasicNameValuePair("searchPart", searchPart));
		params.add(new BasicNameValuePair("searchDoc", searchDoc));
		params.add(new BasicNameValuePair("indexpage", indexpage));

		result = getInterpriseDataFromWC(params, "IndexMyObjectResource/myWTObjects");

		return result;

	}

	/**
	 * 调用windchill接口，获取返回信息
	 * 
	 * @return String json数据
	 */
	public static String getInterpriseDataFromWC(List<NameValuePair> params, String servername) {
		String result = "";

		logger.debug("start getInterpriseDataFromWC =======》");

		String url = "http://" + WC_DOMAIN + "/Windchill/servlet/rest/" + servername;

		logger.debug("url =" + url);

		CloseableHttpClient httpClient = null;
		CloseableHttpResponse response = null;
		try {
			java.net.URI uri = new URI(url);
			HttpPost httpPost = new HttpPost(uri);

			HttpEntity uefEntity = new UrlEncodedFormEntity(params, "utf-8");
			httpPost.setEntity(uefEntity);

			CredentialsProvider credsProvider = new BasicCredentialsProvider();
			credsProvider.setCredentials(new AuthScope(uri.getHost(), uri.getPort()),
					new UsernamePasswordCredentials(USERNAME, PASSWORD));
			httpClient = HttpClients.custom().setDefaultCredentialsProvider(credsProvider).build();

			response = httpClient.execute(httpPost);

			logger.debug("The response value of token:" + response.getFirstHeader("token"));

			// 获取响应对象
			HttpEntity resEntity = response.getEntity();
			if (resEntity != null) {
				// 打印响应长度
				logger.debug("Response content length: " + resEntity.getContentLength());
				// 返回响应内容
				result = EntityUtils.toString(resEntity, Charset.forName("UTF-8"));
				logger.debug(result);
			}

			// 销毁
			EntityUtils.consume(resEntity);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		} finally {
			try {
				if (response != null) {
					response.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}

			try {
				if (httpClient != null) {
					httpClient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return result;
	}

}
