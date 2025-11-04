# 网络爬虫
## 作用
1. 数据采集
2. 软件测试
3. 抢票
4. 网络安全
5. web漏洞扫描

## 爬虫的分类
1. 根据爬取网站的数量可以分为：通用爬虫和聚焦爬虫
2. 根据获取数据的目的可以分为：功能性爬虫和数据增量爬虫
### 通用爬虫
1. 搜索引擎爬虫
2. 门户类爬虫
3. 垂直爬虫

特点：
1. 爬取的网站数量多
2. 爬取的网站类型多
3. 爬取的网站数据量多

### 聚焦爬虫
1. 特点：爬取网站数量有上限，有明确的目标
2. 分类 
 * 功能性爬虫
   * 投票爬虫
   * 抢票爬虫
   * 短信轰炸等
 * 数据增量爬虫

## 爬虫的实现
### 基本流程
目标——>发送请求——>获取响应——>解析数据——>存储数据

1. 目标：确定要爬取的网站（`URL`）
2. 发送请求：使用`Python`的`requests`库发送HTTP请求
3. 获取响应：获取服务器返回的响应
4. 解析数据：使用`Python`的解析库（如`BeautifulSoup`、`lxml`等）解析`HTML`或`XML`数据
5. 存储数据：将解析后的数据存储到数据库、文件或其他存储介质中

### 实现示例
模仿用户继续百度搜索
```python
import requests
from bs4 import BeautifulSoup

# 目标URL
url = "https://www.baidu.com/s?wd=python"

# 发送请求
response = requests.get(url)

# 解析数据
soup = BeautifulSoup(response.text, "html.parser")

# 查找搜索结果
results = soup.find_all("div", class_="result")

# 打印搜索结果
for result in results:
    title = result.find("h3").text
    link = result.find("a")["href"]
    print(title, link)
```
