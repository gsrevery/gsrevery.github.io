# 基础

## 数据类型
### 数字
特点：
1. 数字类型可以进行加减乘除等运算
2. 数字类型可以进行比较运算
3. 数字类型可以进行位运算
4. 数字类型可以进行转换
```python
num = 10
print(num, '数字')
print(type(num), 'int', '数据检测')
```

### 字符串
特点：
1. 字符串类型可以进行拼接
2. 字符串类型可以进行重复
3. 字符串类型可以进行切片
4. 字符串类型可以进行查找和替换
5. 字符串类型可以进行转换
6. 字符串类型可以进行编码和解码
7. 字符串类型可以进行格式化输出
```python
str = 'hello word'
print(str, '字符串')
print(type(str), 'str', '数据检测')
```

### 列表
特点：
1. 列表类型可以进行添加、删除、修改、查找等操作
2. 列表类型可以进行排序、反转、计数等操作
3. 列表类型可以进行切片
4. 列表类型可以进行转换
5. 列表类型可以进行嵌套
6. 列表类型可以进行推导式
```python
list = [1, 2, 3, 4, 5]
print(list, '列表')
print(type(list), 'list', '数据检测')
```

### 元组
特点：
元组的特点：
1. 元组类型是不可变的，不能进行添加、删除、修改等操作
2. 元组类型可以进行排序、反转、计数等操作
```python
tuple = (1, 2, 3, 4, 5)
print(tuple, '元组')
print(type(tuple), 'tuple', '数据检测')
```

### 集合
特点：
1. 集合类型可以进行添加、删除、修改、查找等操作
2. 集合类型可以进行排序、反转、计数等操作
3. 集合类型可以进行切片
4. 集合类型可以进行转换
5. 集合类型可以进行嵌套
6. 集合类型可以进行推导式
```python
set = {1, 2, 3, 4, 5}
print(set, '集合')
print(type(set), 'set', '数据检测')
```

### 字典
特点：
1. 字典是一种无序的、可变的、可重复的、键值对的集合
2. 字典的键必须是不可变的，如字符串、数字、元组等
3. 字典的值可以是任意类型的对象
4. 字典的键不能重复
5. 字典的值可以重复
6. 字典的键值对是无序的
7. 字典的键值对是可变的
8. 字典的键值对可以通过键来访问、添加、删除、修改等操作
```python
dict = {'a': 1, 'b': 2, 'c': 3}
print(dict, '字典')
print(type(dict), 'dict', '数据检测')
```

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

## for循环
`for in`中的`in`后面可以是列表、元组、字符串、集合、字典等
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

## 输入函数
```python
# input: 输入函数
name = input("请输入姓名：")
print(name, '输入函数')
```

## 转义字符
### 换行符
```python
print("hello\nword", '换行符')
```
### 制表符
```python
print("hello\tword", '制表符')
```
### 反斜杠
```python
print("hello\\word", '反斜杠')
```
### 单引号
```python
print('hello\'word', '单引号')
```
### 双引号
```python
print("hello\"word", '双引号')
```
### 原始字符串
```python
print(r"hello\nword", '原始字符串')
```