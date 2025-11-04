# 常用方法

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

## 数据检测
### 检测变量是否为指定类型
```python
# isinstance: 检测变量是否为指定类型
print(isinstance(1, int), '数据检测')
print(isinstance(1.0, float), '数据检测')
print(isinstance('1', str), '数据检测')
print(isinstance([1, 2, 3], list), '数据检测')
print(isinstance((1, 2, 3), tuple), '数据检测')
print(isinstance({1, 2, 3}, set), '数据检测')
print(isinstance({'a': 1, 'b': 2}, dict), '数据检测')
print(isinstance(True, bool), '数据检测')
print(isinstance(None, NoneType), '数据检测')
print(isinstance(print, function), '数据检测')
```
### 检测变量是否为指定类型
```python
# type: 检测变量的类型
print(type(1), 'int', '数据检测')
print(type(1.0), 'float', '数据检测')
print(type('1'), 'str', '数据检测')
print(type([1, 2, 3]), 'list', '数据检测')
print(type((1, 2, 3)), 'tuple', '数据检测')
print(type({1, 2, 3}), 'set', '数据检测')
print(type({'a': 1, 'b': 2}), 'dict', '数据检测')
print(type(True), 'bool', '数据检测')
print(type(None), 'NoneType', '数据检测')
print(type(print), 'function', '数据检测')
```

## 字符串运算符
### 字符串拼接
```python
print("hello" + "word", '字符串拼接')
```
### 字符串重复
```python
print("hello" * 3, '字符串重复')
```
### 字符串长度
```python
print(len("hello"), '字符串长度')
```
### 字符串切片
```python
# 从左往右
# 从第二个字符开始，到第三个字符结束（即3-1=2位）
print("hello"[1:3], '字符串切片')
# 从第二个字符开始，截取后面所有字符
print("hello"[1:], '字符串切片')

# 从右往左数
# 从倒数第一个字符开始，截取后面所有字符
print("hello"[-1:], '字符串切片')
# 从倒数第三个字符开始，截取后面所有字符
print("hello"[-3:], '字符串切片')
# 从第二字符开始，截取后面所有字符
print("hello"[::-1], '字符串切片')
```
### 字符串成员运算
```python
print("hello" in "hello word", '字符串成员运算')
```
### 字符串比较运算
```python
print("hello" == "hello", '字符串比较运算')
```
### 字符串大小写转换
```python
print("hello".upper(), '字符串大小写转换')
```
### 字符串去除空格
```python
print(" hello ".strip(), '字符串去除空格')
```
### 字符串替换
```python
print("hello word".replace("word", "python"), '字符串替换')
```
### 字符串分割
```python
print("hello word".split(), '字符串分割')
```
### 字符串格式化
```python
print("我是{}，我今年{}岁".format("张三", 18), '字符串格式化')

print("我是{name}，我今年{age}岁".format(name="张三", age=18), '字符串格式化')

print("我是{0}，我今年{1}岁".format("张三", 18), '字符串格式化')
```

### find: 查找子字符串
```python
print("hello word".find("word"), '字符串方法')
```
### index: 查找子字符串
```python
print("hello word".index("word"), '字符串方法')
```
### count: 统计子字符串出现次数
```python
print("hello word".count("l"), '字符串方法')
```

## 类型转换
### 字符串转换为整数
```python
print(int("123"), '字符串转换为整数')
```

### 字符串转换为浮点数
```python
print(float("123.456"), '字符串转换为浮点数')
```

### 字符串转换为列表
```python
print("hello".split(), '字符串转换为列表')
# 可以指定分隔符
print("hello,word".split(","), '字符串转换为列表')
```

### 字符串转换为元组
```python
print(tuple("hello"), '字符串转换为元组')
```

### 字符串转换为集合
注意：字符串转换为集合时，会自动去重
```python
print(set("hello"), '字符串转换为集合')
```

### 列表转换为字符串
```python
print("".join(["h", "e", "l", "l", "o"]), '列表转换为字符串')
```

### 元组转换为字符串
```python
print("".join(("h", "e", "l", "l", "o")), '元组转换为字符串')
```

### 集合转换为字符串
注意：集合转换为字符串时，会自动去重
```python
print("".join({"h", "e", "l", "l", "o"}), '集合转换为字符串')
```

### 数字转换为字符串
```python
print(str(123), '数字转换为字符串')
```

### eval: 执行字符串表达式
`eval`可以实现`list、tuple、dict、set`和字符串之间的转换
```python
print(eval("1 + 2"), 'eval: 执行字符串表达式')
print(eval("['h', 'e', 'l', 'l', 'o']"), 'eval: 执行字符串表达式')
print(eval("('h', 'e', 'l', 'l', 'o')"), 'eval: 执行字符串表达式')
print(eval("{'h', 'e', 'l', 'l', 'o'}"), 'eval: 执行字符串表达式')
print(eval("{'h': 1, 'e': 2, 'l': 3, 'o': 4}"), 'eval: 执行字符串表达式')
```

## 深浅拷贝
### 浅拷贝
```python
import copy

# 浅拷贝
list1 = [1, 2, 3]
list2 = copy.copy(list1)
list1.append('4')
print(list1, '浅拷贝')
print(list2, '浅拷贝')
```

### 深拷贝
```python
import copy

# 深拷贝
list1 = [1, 2, 3, [4, 5, 6]]

list2 = copy.deepcopy(list1)
list1.append('4')
list1[3].append('7')
print(list1, '深拷贝')
print(list2, '深拷贝')
```

## 内置函数
```python
import builtins

# 查看所有内置函数
print(dir(builtins), '查看所有内置函数')
```
### abs: 绝对值
```python
print(abs(-1), 'abs: 绝对值')
```

### all: 所有元素为 True 时返回 True
```python
print(all([1, 2, 3]), 'all: 所有元素为 True 时返回 True')
```

### any: 任意元素为 True 时返回 True
```python
print(any([1, 2, 3]), 'any: 任意元素为 True 时返回 True')
```

### bin: 二进制
```python
print(bin(10), 'bin: 二进制')
```

### chr: 整数转换为字符
```python
print(chr(97), 'chr: 整数转换为字符')
```

### ord: 字符转换为整数
```python
print(ord('a'), 'ord: 字符转换为整数')
```

### pow: 幂运算
```python
print(pow(2, 3), 'pow: 幂运算')
```

### round: 四舍五入
```python
print(round(2.5), 'round: 四舍五入')
```

### sum: 求和
```python
print(sum([1, 2, 3]), 'sum: 求和')
```

### len: 长度
```python
print(len("hello"), 'len: 长度')
```

### max: 最大值
```python
print(max([1, 2, 3]), 'max: 最大值')
```

### min: 最小值
```python
print(min([1, 2, 3]), 'min: 最小值')
```

### sorted: 排序
```python
print(sorted([1, 2, 3]), 'sorted: 排序')
```

### reversed: 反转
```python
print(list(reversed([1, 2, 3])), 'reversed: 反转')
```

### str: 转换为字符串
```python
print(str(123), 'str: 转换为字符串')
```

### type: 类型
```python
print(type(123), 'type: 类型')
```

### zip: 压缩
```python
print(list(zip([1, 2, 3], ['a', 'b', 'c'])), 'zip: 压缩')
```

### map: 映射
```python
print(list(map(lambda x: x * 2, [1, 2, 3])), 'map: 映射')
```

### reduce: 累计
```python
from functools import reduce

# 函数只能有两个参数
def fun(x, y):
    return x + y

print(reduce(fun, [1, 2, 3]), 'reduce: 累计')
print(reduce(lambda x, y: x + y, [1, 2, 3]), 'reduce: 累计')
```

### filter: 过滤
```python
print(list(filter(lambda x: x % 2 == 0, [1, 2, 3])), 'filter: 过滤')
```

## 正则
### 使用方法
1. 导入正则模块
```python
import re
```
2. 编译正则表达式
```python
# 编译正则表达式
pattern = re.compile(r'正则表达式')
```
3. 匹配正则表达式
```python
# 匹配正则表达式
result = pattern.match('字符串')

# 匹配正则表达式
result = re.match('正则表达式','字符串')
# 扫描字符串，返回第一个匹配的对象
result = re.search('正则表达式','字符串')
# 匹配正则表达式
result = re.findall('正则表达式','字符串')
# 替换正则表达式
result = re.sub('正则表达式','替换字符串','字符串')
# 替换正则表达式
result = re.sub('正则表达式','替换字符串','字符串',count=1)
# 替换正则表达式
result = re.sub('正则表达式','替换字符串','字符串',count=1,flags=re.I)

```

### 匹配正则表达式
#### 匹配单个字符
```python
import re
# 匹配单个字符
str = 'hello python'
# 在str中，
result = re.match('h',str)
print(result)
# 如果匹配成功，返回一个对象，否则返回None
print(result.group())
# 如果匹配成功，返回匹配成功的字符串，匹配失败会报错
```

#### 匹配多个字符
1. `*`匹配
2. `?`匹配，一个字符出现1次或者0次
3. `+`匹配，一个字符出现1次或者多次
4. `{m}`匹配，一个字符出现m次
5. `{m,n}`匹配，一个字符出现m次到n次
```python
import re

str = 'hello python'
# 1. `*`匹配
result = re.match('\w*',str)
print(result)
print(result.group()) # hello

# 2. `?`匹配，一个字符出现1次或者0次
result = re.match('h?',str)
print(result)
print(result.group())

# 3. `+`匹配，一个字符出现1次或者多次
result = re.match('h+',str)
print(result)
print(result.group())

# 4. `{m}`匹配，一个字符出现m次
result = re.match('h{2}',str)
print(result)
print(result.group())

# 5. `{m,n}`匹配，一个字符出现m次到n次
result = re.match('h{2,3}',str)
print(result)
print(result.group())

```

#### 匹配开头和结尾
1. `^`匹配字符串开头
2. `$`匹配字符串结尾
```python
import re

str = 'hello python'
# 1. `^`匹配字符串开头
result = re.match('^h',str)
print(result)
print(result.group())

# 2. `$`匹配字符串结尾
result = re.match('python$',str)
print(result)
print(result.group())
``` 