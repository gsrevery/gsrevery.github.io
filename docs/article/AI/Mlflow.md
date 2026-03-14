# Mlflow

## 安装
安装`mlflow`有两种方式，一种是直接使用`pip`安装，另一种是从源码安装。

如果不需要源码则直接使用`pip`安装即可：安装命令如下：
```bash
pip install mlflow
```
今天主要记录一下从源码安装`mlflow`的过程。
### 1.获取源码
克隆`mlflow`仓库：
```bash
git clone https://github.com/mlflow/mlflow.git
```
或者直接去仓库下载压缩包，解压后进入目录。

### 2.创建conda环境
创建conda环境：(注意尽量使用python3.11版本，3.9版本会报错)
```bash
conda create -n mlflow-dev python=3.11 -y
```
激活conda环境：
```bash
conda activate mlflow-dev
```
### 3.安装`mlflow`依赖
安装`mlflow`依赖：
```bash
pip install -U pip setuptools wheel
```
安装`mlflow`：
```bash
pip install -e .
```
7. 验证安装：
```bash
mlflow --version
```
### 4.启动 MLflow 服务器
启动 MLflow 服务器
```bash
mlflow server --backend-store-uri sqlite:///mlflow.db --default-artifact-root ./mlruns --host 127.0.0.1 --port 5000
```

### 5.安装前端依赖
进入前端代码目录：
```bash
cd mlflow/server/js
```
**安装前端依赖(当前安装的mlflow版本为3.8.0)**：
1. 安装`node.js`，需要版本等于22.xx。
2. 安装`npm`，版本需要大于8。
3. 安装`yarn`，版本需要等于1.22.22。
4. 如果`"plotly.js": "2.5.1"`，则需要先从`package-lock.json`中删除,安装成功后，再单独安装`plotly.js`最新的依赖包：（我在安装plotly.js时遇到了问题，导致安装失败，所以需要先删除，这样可以保证安装成功项目可以跑起来）
5. 需要楼梯

将`package-lock.json`中的`"json-bigint": "databricks/json-bigint#a1defaf9cd8dd749f0fd4d5f83a22cd846789658"`修改为`"json-bigint": "^1.0.0"`
```bash
# 安装依赖：
yarn install
# 安装plotly.js依赖：
yarn add plotly.js
# 启动前端服务器：
yarn start
```