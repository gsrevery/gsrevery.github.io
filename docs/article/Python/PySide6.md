# PySide6使用

## 自定义窗口

下面是一个完整的自定义窗口的例子，包括图标更改，按钮添加，最小化、最大化、关闭窗口，窗口拖拽功能的重写。

<details>
<summary><b>自定义窗口</b></summary>

```python
import sys
import os

from PySide6.QtCore import Qt
from PySide6.QtWidgets import (
    QApplication, QMainWindow, QWidget, 
    QHBoxLayout, QLabel, QSizePolicy
)
from PySide6.QtGui import  QIcon, QAction

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # 设置窗口为全屏显示
        # self.showMaximized()
        self.resize(1200, 800)
        # 设置无边框窗口（可选，用于完全自定义标题栏）
        self.setWindowFlags(Qt.FramelessWindowHint)
        # 窗口拖动相关属性
        self.drag_position = None
        self.is_dragging = False
        
        # 保存工具栏引用，避免重复创建
        self.main_toolbar = None

        # 创建自定义顶部工具栏
        self.create_custom_toolbar()
        
        # 主容器
        container = QWidget()
        content = QLabel('就这样的例子')
        # 水平居中
        layout = QHBoxLayout(container)
        layout.addStretch()
        layout.addWidget(content)
        layout.addStretch()
        self.setCentralWidget(container)

    
    def create_custom_toolbar(self):
        """创建自定义顶部工具栏"""
        # 创建工具栏
        self.main_toolbar = self.addToolBar("主工具栏")
        self.main_toolbar.setMovable(False)
        self.main_toolbar.setFloatable(False)
        self.main_toolbar.setToolButtonStyle(Qt.ToolButtonTextBesideIcon)
        
        # 设置工具栏样式
        self.main_toolbar.setStyleSheet("""
            QToolBar {
                background-color: #f8f9fa;
                border: none;
                padding: 5px;
                spacing: 10px;
            }
            QToolBar QToolButton {
                background-color: transparent;
                border: 1px solid transparent;
                border-radius: 4px;
                padding: 8px 12px;
                margin: 2px;
                font-size: 14px;
            }
            QToolBar QToolButton:hover {
                background-color: #e9ecef;
                border-color: #ced4da;
            }
            QToolBar QToolButton:pressed {
                background-color: #dee2e6;
            }
            /* 应用图标和OCR工具特殊样式 - 禁用所有交互效果 */
            QToolBar QToolButton#app_icon,
            QToolBar QToolButton#ocr_tool {
                background-color: transparent !important;
                border: none !important;
                padding: 8px 12px;
            }
            QToolBar QToolButton#app_icon:hover,
            QToolBar QToolButton#ocr_tool:hover {
                background-color: transparent !important;
                border: none !important;
                color: black;
            }
            QToolBar QToolButton#app_icon:pressed,
            QToolBar QToolButton#ocr_tool:pressed {
                background-color: transparent !important;
                border: none !important;
                color: black;
            }
        """)
        
        # 左侧功能按钮区域
        # 应用图标 - 使用图片文件，完全无交互
        icon_path = os.path.join(os.path.dirname(__file__), "static", "favico.png")
        app_icon_action = QAction(QIcon(icon_path), "", self)
        app_icon_action.setToolTip("应用图标")
        self.main_toolbar.addAction(app_icon_action)
        
        # 为应用图标按钮设置特殊ID
        app_icon_button = self.main_toolbar.widgetForAction(app_icon_action)
        if app_icon_button:
            app_icon_button.setObjectName("app_icon")
        
        # 保存按钮
        save_action = QAction("💾 保存", self)
        save_action.setToolTip("保存当前数据")
        save_action.triggered.connect(self.save_data)
        self.main_toolbar.addAction(save_action)  # 修复：使用 self.main_toolbar
        
        # 暂存到单一窗口按钮
        temp_save_action = QAction("📄 暂存", self)
        temp_save_action.setToolTip("暂存到单一窗口")
        temp_save_action.triggered.connect(self.temp_save_to_window)
        self.main_toolbar.addAction(temp_save_action)  # 修复：使用 self.main_toolbar
        
        # 作废按钮
        void_action = QAction("🗑️ 作废", self)
        void_action.setToolTip("作废当前数据")
        void_action.triggered.connect(self.void_data)
        self.main_toolbar.addAction(void_action)  # 修复：使用 self.main_toolbar
        
        # 添加弹性空间，将右侧按钮推到右边
        spacer = QWidget()
        spacer.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Preferred)
        self.main_toolbar.addWidget(spacer)  # 修复：使用 self.main_toolbar
        
        # 右侧窗口控制按钮区域
        # OCR识别工具客户端 - 也禁用交互效果
        ocr_action = QAction("OCR识别工具客户端", self)
        ocr_action.setToolTip("OCR识别工具客户端")
        # 不连接任何信号，使其无交互
        self.main_toolbar.addAction(ocr_action)
        # 为OCR工具按钮设置特殊ID
        ocr_button = self.main_toolbar.widgetForAction(ocr_action)
        if ocr_button:
            ocr_button.setObjectName("ocr_tool")
        
        # 最小化按钮
        minimize_action = QAction("➖", self)
        minimize_action.setToolTip("最小化窗口")
        minimize_action.triggered.connect(self.showMinimized)
        self.main_toolbar.addAction(minimize_action)
        
        # 放大/还原按钮
        self.maximize_action = QAction("⬜", self)
        self.maximize_action.setToolTip("最大化窗口")
        self.maximize_action.triggered.connect(self.toggle_maximize)
        self.main_toolbar.addAction(self.maximize_action)
        
        # 关闭按钮
        close_action = QAction("❌", self)
        close_action.setToolTip("关闭应用")
        close_action.triggered.connect(self.close)
        self.main_toolbar.addAction(close_action)
        
        # 设置关闭按钮的特殊样式
        close_button = self.main_toolbar.widgetForAction(close_action)
        if close_button:
            close_button.setStyleSheet("""
                QToolButton {
                    background-color: transparent;
                    color: #dc3545;
                }
                QToolButton:hover {
                    background-color: #dc3545;
                    color: white;
                }
            """)
        
        # 【重要】安装事件过滤器以启用拖动功能
        self.main_toolbar.installEventFilter(self)
        
    # 工具栏按钮处理方法
    def save_data(self):
        """保存数据"""
        print("保存数据功能")
        # 这里添加保存逻辑
        
    def temp_save_to_window(self):
        """暂存到单一窗口"""
        print("暂存到单一窗口功能")
        # 这里添加暂存逻辑
        
    def void_data(self):
        """作废数据"""
        print("作废数据功能")
        # 这里添加作废逻辑

    def toggle_maximize(self):
        """切换最大化/还原窗口"""
        if self.isMaximized():
            self.showNormal()
            self.maximize_action.setText("⬜")
            self.maximize_action.setToolTip("最大化窗口")
        else:
            self.showMaximized()
            self.maximize_action.setText("🔲")
            self.maximize_action.setToolTip("还原窗口")
    
    
    # 窗口拖动
    def eventFilter(self, obj, event):
        """事件过滤器，处理工具栏的拖动事件"""
        from PySide6.QtCore import QEvent
        from PySide6.QtGui import QMouseEvent
        
        # 只处理主工具栏的鼠标事件
        if obj == self.main_toolbar:
            if event.type() == QEvent.MouseButtonPress:
                if event.button() == Qt.LeftButton:
                    # 检查点击位置是否在按钮上
                    widget_at_pos = obj.childAt(event.pos())
                    if widget_at_pos is None or not hasattr(widget_at_pos, 'text'):
                        # 点击的是空白区域，开始拖动
                        self.drag_position = event.globalPos() - self.frameGeometry().topLeft()
                        self.is_dragging = True
                        event.accept()
                        return True
                        
            elif event.type() == QEvent.MouseMove:
                if self.is_dragging and self.drag_position is not None:
                    # 拖动窗口
                    self.move(event.globalPos() - self.drag_position)
                    event.accept()
                    return True
                    
            elif event.type() == QEvent.MouseButtonRelease:
                if event.button() == Qt.LeftButton:
                    # 停止拖动
                    self.is_dragging = False
                    self.drag_position = None
                    event.accept()
                    return True
        
        return super().eventFilter(obj, event)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())

```
</details>

## 数据传递

场景：比如主窗口引用了a、b两个组件（窗口打开就已经初始化完成了），操作a组件中的某个按钮，调用接口获取到的数据，需要传回主窗口和b组件，并且更新主窗口和b组件的内容。

解决方案：使用全局信号总线`Signal`，类型与前端的`EventBus`相同，都是全局的事件总线，用于在不同组件之间传递数据。

实现步骤：
1. 定义全局信号总线`Signal`，在主窗口中初始化。
2. 在a组件中调用接口获取数据后，通过信号总线将数据发送（只需要发送一次，各个组件需要则自己获取就可以了）。
3. 在主窗口中定义一个方法，用于更新主窗口的内容。
4. 在b组件中定义一个方法，用于更新b组件的内容。

<details>
<summary><b>实现代码</b></summary>

1. 创建一个全局信号总线`signal_bus`文件
```python
from PySide6.QtCore import Signal

# 定义全局信号总线
# signal_bus.py 全局信号总线，简化通信
from PySide6.QtCore import QObject, Signal

class SignalBus(QObject):
    # 定义一个通用信号，上传成功后传递数据
    file_uploaded = Signal(dict)

# 实例化一个全局信号总线
signal_bus = SignalBus()
```

2. a组件中调用接口获取数据后，通过信号总线将数据发送（只需要发送一次，各个组件需要则自己获取就可以了）。
```python
from signal_bus import signal_bus

# 假设这是a组件中的一个方法，调用接口获取数据
def fetch_data():
    # 模拟获取数据
    data = {"name": "张三", "age": 30}
    # 通过信号总线传递数据
    signal_bus.file_uploaded.emit(data)
```

3. 在主窗口中接收信号，更新主窗口的内容。
```python
from signal_bus import signal_bus

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        # 绑定全局信号（接收A模块的上传数据）
        signal_bus.file_uploaded.connect(self.update_main)

    def update_main(self, data):
        # 主页面更新视图
        self.name_label.setText(data["name"])
        self.age_label.setText(str(data["age"]))

```

4. 在b组件中定义一个方法，用于更新b组件的内容。
```python
class BComponent(QWidget):
    def __init__(self):
        super().__init__()
        # 绑定全局信号（接收A模块的上传数据）
        signal_bus.file_uploaded.connect(self.update_main)

    def update_main(self, data):
        # b组件更新视图
        self.name_label.setText(data["name"])
        self.age_label.setText(str(data["age"]))
```

</details>

## Pyside6可视化使用


