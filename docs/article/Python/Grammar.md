# 语法规则

## 打印
```python
print('Hello python')
```
## 计算
```python
print(1+1+1+1, '计算')
```
## 比较
```python
print(1 > 2, '比较')
print(1 == 1, '比较')
```
## 变量声明
```python
msg = "雷军"
print(msg, '变量声明')
```
## 条件判断
```python
grade = 99

if grade >= 90:
    print("优", '条件判断')
elif 80 <= grade < 90:
    print("良", '条件判断')
elif 60 <= grade < 80:
    print("中", '条件判断')
else:
    print("差", '条件判断')
```
## 条件运算
```python
# and：与。and两边的条件都为True时，结果才为True
print(1 == 1 and 2 == 1, '条件运算and')
# or：或。or两边的条件只要有一个为True时，结果就为True
print(1 == 1 or 2 == 1, '条件运算or')
# not：取反。
print(not 1 > 0, '条件运算not')
```
## for循环
```python
list = [1, 2, 3, 4, 5]
str = 'hello word'

for item in list:
    print(item, 'for循环')

for s in str:
    print(s, 'for循环')
```
## 带索引循环
```python
# 带索引循环需要加enumerate，将数据变为可枚举的
for i, str_item in enumerate(str):
    print(i, str_item, '带索引循环')
```
## 列表（数组）
```python
# 列表（数组）
arr = ["《红楼梦》", "《西游记》", "《三国演义》", "《水浒传》"]
```
### len: 查看列表长度
```python
len(arr)
```
### append: 在列表末尾添加元素
```python
arr.append("《庄子》")
```
### insert: 在列表指定位置插入元素
```python
arr.insert(1, "《庄子》")
```
### remove: 删除指定值的元素
```python
arr.remove("《西游记》")
```
### pop: 删除指定索引的元素
```python
arr.pop(1)
```

## 获取接口调用数据
```python
from request import requestsData
print(requestsData, 'requestsData')
```

## 对象
```python
grade = {
    "Python": 100,
    "Java": 88,
    "C++": 60,
    "JavaScript": 70
}
```
### 获取对象属性
```python
print(grade['Java'], '获取对象属性')
# 可获取以中文为key的属性
print(grade.get('Python'), '获取对象属性')
```

