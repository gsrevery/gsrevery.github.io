# XGBoost

## XGBoost 介绍
XGBoost（eXtreme Gradient Boosting）是梯度提升决策树（GBDT）的高效优化实现，核心是通过前向分步加法训练、二阶泰勒展开近似损失与正则化控制，结合工程优化实现高精度与高效率，常用于分类、回归、排序等任务。以下从核心原理、关键创新、工程优化三方面展开说明：

---

### 一、核心思想与加法训练框架

XGBoost遵循梯度提升的核心逻辑：串行训练多棵决策树，每棵树拟合前一轮模型的预测残差（负梯度），最终将所有树的预测结果加权累加得到最终预测，公式如下：

 $\hat{y}_i^{(t)} = \hat{y}_i^{(t-1)} + f_t(x_i)$ 

其中， $\hat{y}_i^{(t)}$  是第  $t$  轮对样本  $i$  的预测值， $f_t$  是第  $t$  棵决策树， $\hat{y}_i^{(t-1)}$  是前  $t-1$  棵树的累加预测结果。训练目标是最小化目标函数，逐步降低模型误差。

---

### 二、目标函数与二阶泰勒展开（核心创新）

XGBoost的目标函数由**训练损失项**和**正则化项**组成，能在拟合数据的同时控制模型复杂度，公式如下：

 $Obj^{(t)} = \sum_{i=1}^n L(y_i, \hat{y}_i^{(t-1)} + f_t(x_i)) + \Omega(f_t) + constant$ 

- **训练损失项**  $L(y_i, \hat{y}_i^{(t-1)} + f_t(x_i))$ ：衡量预测值与真实值的差异，如回归用MSE、分类用对数损失等。

- **正则化项**  $\Omega(f_t) = \gamma T + \frac{1}{2}\lambda \sum_{j=1}^T w_j^2$ ：控制树复杂度， $\gamma$  是叶节点数量惩罚系数， $T$  为叶节点数， $\lambda$  是叶节点权重的L2正则系数， $w_j$  是第  $j$  个叶节点的输出权重。

为高效优化目标函数，XGBoost对损失项在  $\hat{y}_i^{(t-1)}$  处做**二阶泰勒展开**，并保留常数项，目标函数可简化为：

 $Obj^{(t)} \approx \sum_{i=1}^n [g_i f_t(x_i) + \frac{1}{2} h_i f_t^2(x_i)] + \gamma T + \frac{1}{2}\lambda \sum_{j=1}^T w_j^2$ 

其中， $g_i = \partial_{\hat{y}_i^{(t-1)}} L(y_i, \hat{y}_i^{(t-1)})$ （一阶梯度）， $h_i = \partial_{\hat{y}_i^{(t-1)}}^2 L(y_i, \hat{y}_i^{(t-1)})$ （二阶梯度）。该近似让每棵树的训练可快速求解，且精度高于仅用一阶梯度的传统GBDT。

进一步假设树的结构固定（即样本到叶节点的映射固定），将样本按叶节点分组，令  $I_j = {i | f_t(x_i) = w_j}$  表示第  $j$  个叶节点对应的样本集合，目标函数可转化为叶节点权重的函数，最优叶节点权重  $w_j^* = -\frac{\sum_{i \in I_j} g_i}{\sum_{i \in I_j} h_i + \lambda}$ ，代入后目标函数的最小值为  $-\frac{1}{2} \sum_{j=1}^T \frac{(\sum_{i \in I_j} g_i)^2}{\sum_{i \in I_j} h_i + \lambda} + \gamma T$ 。

---

### 三、树的构建与分裂策略

树的构建采用**贪心算法**，递归选择最优分裂点以最大化目标函数增益，核心步骤如下：

1. 初始化叶节点，计算所有样本的  $g_i$  和  $h_i$  总和。

2. 遍历每个特征及可能的分裂点，计算分裂前后的目标函数差值（即增益）：

 $Gain = \frac{1}{2} \left[ \frac{(\sum_{L} g_i)^2}{\sum_{L} h_i + \lambda} + \frac{(\sum_{R} g_i)^2}{\sum_{R} h_i + \lambda} - \frac{(\sum_{all} g_i)^2}{\sum_{all} h_i + \lambda} \right] - \gamma$ 

其中， $\sum_L$ 、 $\sum_R$  分别是分裂后左、右子节点的梯度和。

1. 选择增益最大的分裂点进行节点分裂；若最大增益小于0，则停止分裂（剪枝）。

2. 重复上述步骤，直至达到最大树深、最小样本权重和等约束条件。

此外，XGBoost支持**近似分裂算法**（分桶找候选分裂点）和**列采样**（每轮训练仅用部分特征），平衡训练效率与模型泛化性。

---

### 四、关键特性与工程优化

1. **稀疏感知与缺失值处理**：训练时自动学习缺失值的最优划分方向，预测时将缺失值分配到默认方向，适配稀疏数据场景。

2. **并行化优化**：以“列块”存储特征，在树节点分裂时并行计算各特征的分裂增益，提升训练速度；支持CPU多线程并行与分布式训练。

3. **缓存优化**：将样本梯度与特征值缓存对齐，减少内存访问开销，提升计算效率。

4. **剪枝策略**：通过正则化与分裂增益阈值（ $\gamma$ ）实现预剪枝，避免过拟合。

---

### 五、预测与模型输出

预测时，输入样本在每棵树中遍历到对应的叶节点，累加所有叶节点的权重值，结合学习率  $\eta$ （收缩系数）得到最终预测结果： $\hat{y} = \sum_{t=1}^T \eta f_t(x)$ ， $\eta$  用于降低单棵树的影响，提升模型鲁棒性。

---

### 核心原理对比（XGBoost vs 传统GBDT）

|特性|XGBoost|传统GBDT|
|---|---|---|
|梯度利用|一阶+二阶梯度（二阶泰勒展开）|仅一阶梯度|
|正则化|L1+L2+叶节点数惩罚|弱正则或无显式正则|
|缺失值处理|稀疏感知，自动学习划分方向|需手动填充缺失值|
|并行能力|支持特征并行、分布式训练|串行训练，无并行优化|
|分裂策略|精确/近似分裂+列采样|贪心精确分裂|
需要我基于上述原理，提供一份可直接运行的**XGBoost分类/回归示例代码**（含参数注释与结果评估）吗？


## XGBoost 的安装
此次学习中，我们将通过jupyter notebook 来演示XGBoost的使用。所以我们需要安装以下库：
```bash
pip install pandas numpy scikit-learn xgboost matplotlib seaborn jupyter
```
### xgboost
1. 用途：高效实现梯度提升决策树（Gradient Boosting）的库。
2. 特点：
    * 性能优异，在很多 Kaggle 比赛中表现突出。
    * 支持分类、回归、排序等任务。
    * 可处理缺失值、支持并行计算、提供正则化防止过拟合。
### jupyter
1. 用途：交互式开发环境（通常指 Jupyter Notebook 或 JupyterLab）。
2. 特点：
    * 允许在浏览器中编写和运行代码块（cell），即时查看结果。
    * 支持 Markdown 文档、公式、图片嵌入，非常适合教学、探索性数据分析和报告撰写。
    * 广泛用于数据科学、机器学习等领域。
### pandas
1. 用途：用于数据处理和分析。
2. 特点：
    * 提供 DataFrame 和 Series 数据结构，便于操作表格型或异构型数据。
    * 支持读写 CSV、Excel、SQL 等多种格式。
    * 强大的数据清洗、筛选、聚合功能。
### numpy
1. 用途：用于科学计算的基础库。
2. 特点：
    * 提供高性能的多维数组对象（ndarray）。
    * 支持广播、向量化运算、线性代数、随机数生成等。
    * 是 pandas、scikit-learn 等库的底层依赖。
### scikit-learn
1. 用途：经典的机器学习库。
2. 特点：
    * 提供大量监督/无监督学习算法（如线性回归、SVM、KMeans、决策树等）。
    * 包含模型评估、交叉验证、数据预处理、特征选择等工具。
    * 接口统一、文档完善，适合初学者和工业应用。
### matplotlib
1. 用途：Python 最基础的绘图库。
2. 特点：
    * 可绘制折线图、散点图、柱状图、直方图等。
    * 高度可定制（颜色、标签、图例、坐标轴等）。
    * 是许多高级可视化库（如 seaborn）的底层依赖。

### seaborn
1. 用途：基于 matplotlib 的高级统计可视化库。
2. 特点：
    * 语法更简洁，适合快速绘制美观的统计图表（如热力图、分布图、箱线图等）。
    * 内置配色方案和样式，图形默认更“好看”。
    * 与 pandas DataFrame 无缝集成。

## 学习场景
先启动`jupyter notebook`, 然后创建一个新的notebook（`file->new->notebook->python 3`）
```py
# 启动
jupyter notebook
```
**注意：每个单元格输入完成后，点击运行按钮（或按 Shift + Enter）执行代码。**

### 场景1：泰坦尼克号生存预测
#### 完整代码
<details><summary><b>详细代码</b></summary>

```py
# 1. 导入库
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb

# 2. 加载数据（确保 train.csv 在当前目录）
df = pd.read_csv('./数据/train.csv')

# 3. 查看基本信息（可选）
print("数据形状:", df.shape)
print("\n缺失值统计:")
print(df.isnull().sum())

# 4. 特征工程与预处理

# 删除无关列
df_clean = df.drop(columns=['PassengerId', 'Name', 'Ticket', 'Cabin']).copy()

# 填充缺失值（不再使用 inplace=True）
df_clean['Age'] = df_clean['Age'].fillna(df_clean['Age'].median())
df_clean['Embarked'] = df_clean['Embarked'].fillna(df_clean['Embarked'].mode()[0])

# 编码分类变量
df_clean['Sex'] = df_clean['Sex'].map({'male': 0, 'female': 1})
df_clean['Embarked'] = LabelEncoder().fit_transform(df_clean['Embarked'])

# 创建新特征
df_clean['FamilySize'] = df_clean['SibSp'] + df_clean['Parch'] + 1
df_clean['IsAlone'] = (df_clean['FamilySize'] == 1).astype(int)

# 5. 准备特征 X 和标签 y
X = df_clean[['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked', 'FamilySize', 'IsAlone']]
y = df_clean['Survived']

# 6. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 7. 训练 XGBoost 模型
model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42,
    eval_metric='logloss'
)

model.fit(X_train, y_train)

# 8. 预测与评估
y_pred = model.predict(X_test)

print("\n=== 模型评估 ===")
print("准确率:", round(accuracy_score(y_test, y_pred), 4))
print("\n分类报告:")
print(classification_report(y_test, y_pred))
```
</details>

#### 单元格 1：导入库（确保已安装）
```py
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import xgboost as xgb
```

#### 单元格 2：加载数据
```py
# 读取本地 CSV 文件
df = pd.read_csv('./数据/train.csv')  # 假设文件名是 titanic.csv，放在当前目录下

print("数据形状:", df.shape)
df.head()
```

#### 单元格 3：数据预处理
```py
# 删除无关列
df_clean = df.drop(columns=['PassengerId', 'Name', 'Ticket', 'Cabin']).copy()

# 填充缺失值（不再使用 inplace=True）
df_clean['Age'] = df_clean['Age'].fillna(df_clean['Age'].median())
df_clean['Embarked'] = df_clean['Embarked'].fillna(df_clean['Embarked'].mode()[0])

# 编码分类变量
df_clean['Sex'] = df_clean['Sex'].map({'male': 0, 'female': 1})
df_clean['Embarked'] = LabelEncoder().fit_transform(df_clean['Embarked'])

# 创建新特征
df_clean['FamilySize'] = df_clean['SibSp'] + df_clean['Parch'] + 1
df_clean['IsAlone'] = (df_clean['FamilySize'] == 1).astype(int)

# 查看结果
df_clean.head()
```

#### 单元格 4：准备训练数据
```py
X = df_clean[['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked', 'FamilySize', 'IsAlone']]
y = df_clean['Survived']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("训练集大小:", X_train.shape)
print("测试集大小:", X_test.shape)
```

#### 单元格 5：训练模型
```py
model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42,
    eval_metric='logloss'
)

model.fit(X_train, y_train)
```

#### 单元格 6：评估结果
```py
y_pred = model.predict(X_test)

print("准确率:", round(accuracy_score(y_test, y_pred), 4))
print("\n分类报告:")
print(classification_report(y_test, y_pred))
```
成功后会输出类似结果：
```text
准确率: 0.6257

分类报告:
              precision    recall  f1-score   support

           0       0.68      0.74      0.71       110
           1       0.52      0.45      0.48        69

    accuracy                           0.63       179
   macro avg       0.60      0.59      0.59       179
weighted avg       0.62      0.63      0.62       179
```

#### 保存Notebook
1. 点击菜单栏 File → Save and Checkpoint
2. 或按快捷键 Ctrl + S（Windows） / Cmd + S（Mac）

## 导出模型
训练好的模型可以直接保存为 `.ubj` 文件，后续加载时无需重新训练。**注意：不要直接保存为 `.json` 文件，因为 XGBoost 模型的 `.json` 文件包含了模型的元数据且会报错，而 `.ubj` 文件则是二进制格式，更轻量级。**

导出模型时，需要在之前训练模型的代码后添加以下代码：（**可以直接跟在训练模型的代码后面也可以单独放在一个单元格中，前提是都需要重头运行一遍**）
```py
# 直接保存为 .ubj（假设 model 是 XGBClassifier）
booster = model.get_booster()
booster.save_model('titanic_xgboost.ubj')
print("✅ 模型已导出为 titanic_xgboost.ubj")
```

## 使用导出的模型
导出模型后，后续可以直接加载模型进行预测，无需重新训练。以下是加载模型的代码：
```py
import xgboost as xgb

# 加载导出的模型
booster = xgb.Booster()
booster.load_model('titanic_xgboost.ubj')
print("✅ 模型已加载")
```
<details><summary><b>配套的完整代码如下：</b></summary>

```py
# predict_from_ubj.py
# 功能：加载已有的 .ubj 模型 → 预测 test.csv → 生成 submission.csv

import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.preprocessing import LabelEncoder

# ----------------------------
# 1. 定义与训练时完全一致的特征工程函数
# ----------------------------
def preprocess_test(df):
    """
    对测试集进行与训练集完全相同的预处理
    """
    df = df.copy()
    
    # 删除无关列（保留 PassengerId 用于提交）
    df = df.drop(columns=['Name', 'Ticket', 'Cabin'], errors='ignore')
    
    # 填充缺失值（必须与训练时一致！）
    df['Age'] = df['Age'].fillna(df['Age'].median())
    df['Fare'] = df['Fare'].fillna(df['Fare'].median())  # test.csv 中 Fare 可能缺失
    df['Embarked'] = df['Embarked'].fillna('S')  # 训练时用的众数是 'S'
    
    # 编码分类变量（必须与训练时一致！）
    df['Sex'] = df['Sex'].map({'male': 0, 'female': 1})
    
    # Embarked 编码：S=0, C=1, Q=2（需与训练时顺序一致）
    embarked_map = {'S': 0, 'C': 1, 'Q': 2}
    df['Embarked'] = df['Embarked'].map(embarked_map)
    
    # 创建新特征（必须与训练时一致！）
    df['FamilySize'] = df['SibSp'] + df['Parch'] + 1
    df['IsAlone'] = (df['FamilySize'] == 1).astype(int)
    
    return df

# ----------------------------
# 2. 加载测试数据
# ----------------------------
print("📥 加载测试数据...")
test_df = pd.read_csv('./数据/test.csv')
passenger_ids = test_df['PassengerId'].copy()  # 保留原始 ID

# ----------------------------
# 3. 特征工程
# ----------------------------
test_clean = preprocess_test(test_df)

# 确保特征顺序与训练时完全一致！
feature_columns = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked', 'FamilySize', 'IsAlone']
X_test = test_clean[feature_columns]

print(f"✅ 测试集形状: {X_test.shape}")

# ----------------------------
# 4. 加载 .ubj 模型
# ----------------------------
print("🔄 加载模型 titanic_xgboost.ubj ...")
model = xgb.Booster()
model.load_model('titanic_xgboost.ubj')  # 支持 .ubj 和 .json

# ----------------------------
# 5. 预测
# ----------------------------
dtest = xgb.DMatrix(X_test)
y_pred_proba = model.predict(dtest)
y_pred = (y_pred_proba > 0.5).astype(int)  # 二分类阈值

print(f"✅ 预测完成，正类比例: {y_pred.mean():.2%}")

# ----------------------------
# 6. 生成提交文件
# ----------------------------
submission = pd.DataFrame({
    'PassengerId': passenger_ids,
    'Survived': y_pred
})

submission.to_csv('submission.csv', index=False)
print("🎉 提交文件已保存为 submission.csv")

# 可选：打印前几行
print("\n📄 提交文件预览:")
print(submission.head())
```

</details>