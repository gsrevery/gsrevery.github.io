<!-- 表格折叠 -->
# 表格

## 折叠表格
* 首先构建一个普通表格
```html
<template>
    <Table
        border
        :columns="columnsData"
        :data="tableData"
        style="border-bottom: 1px solid #DCDCDC;"
    >
        <template slot-scope="{ row }" slot="noteOp">
            <div class="btn">查看备注信息</div>
        </template>
    </Table>
</template>
```
* 表格中插入数据
```js
import expandRow from './TabExpand.vue';
export default {
    data() {
        return {
        // 表格数据
        columnsData: [
            {
                type: 'expand',
                width: 30,
                render: (h, params) => {
                    return h(expandRow, {
                        props: {
                            row: params.row
                        }
                    })
                }
            },
            {
                title: '数据项名称',
                align: 'center',
                key: 'dataName',
                tooltip: true
            },
            {
                title: '标准名称',
                align: 'center',
                key: 'name',
                tooltip: true
            },
            {
                title: '数据名',
                align: 'center',
                key: 'nameCn',
                tooltip: true
            },
            {
                title: '数据英文名',
                align: 'center',
                key: 'nameEn',
                tooltip: true
            },
            {
                title: '数据俄文名',
                align: 'center',
                key: 'nameRu',
                tooltip: true
            },
            {
                title: '排序值',
                align: 'center',
                key: 'sort',
                width: 100,
                tooltip: true
            },
            {
                title: '备注',
                align: 'center',
                slot: 'noteOp'
            }
        ],
        // 表格数据
        tableData: [
            {
                dataName: 'item.dataName',
                message: 'item.message',
                name: 'element.name',
                nameCn: 'element.nameCn',
                nameEn: 'element.nameEn',
                nameRu: 'element.nameRu',
                sort: 'element.sort',
                foldData: [
                    {
                        name: 'element.name',
                        nameCn: 'element.nameCn',
                        nameEn: 'element.nameEn',
                        nameRu: 'element.nameRu'
                    }
                ]
            },
            {
                dataName: 'item.dataName',
                message: 'item.message',
                name: 'element.name',
                nameCn: 'element.nameCn',
                nameEn: 'element.nameEn',
                nameRu: 'element.nameRu',
                sort: 'element.sort',
                foldData: [
                    {
                        name: 'element.name',
                        nameCn: 'element.nameCn',
                        nameEn: 'element.nameEn',
                        nameRu: 'element.nameRu'
                    }
                ]
            }
        ],
    }
}
```
* 引入展示折叠样式expandRow
```vue
<template>
    <div>
        <div>
            <div class="row" v-for="(item, id) in dataList" :key="id">
                <div class="row-col">
                    <div>{{ item.name }}</div>
                    <div>{{ item.nameCn }}</div>
                    <div>{{ item.nameEn }}</div>
                    <div>{{ item.nameRu }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                dataList: []
            }
        },
        watch: {
            row: {
                handler (to) {
                    this.dataList = to.foldData
                },
                immediate: true
            }
        }
    };
</script>

<style  lang="less" scoped>
.row {
    padding: 10px 0;
    border-bottom: 1px solid #DCDCDC;
    .row-col {
        display: flex;
        align-items: center;
        width: 545px;
        margin-left: 120px;
        div {
            width: 25%;
            text-align: center;
            padding: 0 20px;
        }
    }
}
:last-child {
    border-bottom: 1px solid #F8F8F9;
}
</style>

```
## 表格单选
* 表格勾选和上面一样
```vue
<template>
    <Table border :columns="columnsData" :data="searchList" @on-row-click="clickRow" max-height="300">
        <template slot-scope="{ row }" slot="radio">
            <RadioGroup v-model="isOnClick">
                <Radio :label="row.stdDataId">&nbsp;</Radio>
            </RadioGroup>
        </template>
    </Table>
</template>

<script>
export default {
    data() {
        return {
            // 选择
            isOnClick: '',
            // 列表数据
            searchList: [],
            columnsData: [
                {
                    title: '选择',
                    align: 'center',
                    slot: 'radio',
                    width: 80
                },
                {
                    title: '数据项Id',
                    align: 'center',
                    key: 'dataId',
                    tooltip: true
                },
                {
                    title: '英文名',
                    align: 'center',
                    key: 'nameEn',
                    tooltip: true
                },
                {
                    title: '俄文名',
                    align: 'center',
                    key: 'nameRu',
                    tooltip: true
                }
            ]
        },
        methods: {
            // 点击单元行
            clickRow(row) {
                // dataId 需要唯一值
                this.isOnClick = row.dataId
            },
        }
    },
}
</script>
```