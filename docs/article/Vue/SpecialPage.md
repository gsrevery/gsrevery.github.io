# 特殊页面

## 单据页面
利用`vue`栅格布局
<details><summary><b>详细代码及页面展示</b></summary>

```vue
<template>
    <div>
        <div class="bill-entry" id="genpdf">
            <Row class="row">
                <Col class="center title" span="24"><h3>账单</h3></Col>
            </Row>
            <Row class="row">
                <Col span="24">
                    <span>Consumer：</span>
                    <Input v-model.trim="statementData.consumer" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="24">
                    <span>地址：</span>
                    <Input v-model.trim="statementData.address" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="24">
                    <span>开户行：</span>
                    <Input v-model.trim="statementData.openBank" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="24">
                    <span>开户行账户：</span>
                    <Input v-model.trim="statementData.bankNo" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="24">
                    <span>订舱号：</span>
                    <Input v-model.trim="statementData.bookingNumber" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="6">
                    <span>USD：</span>
                    <Input v-model.trim="statementData.exchangeRateUSD" />
                </Col>
                <Col span="6">
                    <span>EUR：</span>
                    <Input v-model="statementData.exchangeRateEUR" />
                </Col>
                <Col span="12">
                    <span>Date：</span>
                    <DatePicker v-model="statementData.billTime" />
                </Col>
            </Row>
            <Row class="row">
                <Col class="center" span="5">收费项</Col>
                <Col class="center" span="3">币值</Col>
                <Col class="center" span="3">集装箱数量</Col>
                <Col class="center" span="3">单价</Col>
                <Col class="center" span="3">总价</Col>
                <Col class="center" span="7">备注</Col>
            </Row>
            <Row v-for="(item, id) in billTable" :key="id" class="row input-center" style="position: relative;">
                <Col class="center" span="5"><Input v-model.trim="item.charges" /></Col>
                <Col class="center" span="3">
                    <Select v-model="item.currency" placeholder="">
                        <Option v-for="item in currencyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col class="center" span="3"><Input v-model.trim="item.num" /></Col>
                <Col class="center" span="3"><Input v-model.trim="item.price" /></Col>
                <Col class="center" span="3"><Input v-model.trim="item.price" /></Col>
                <Col class="center" span="7"><Input v-model.trim="item.remark" /></Col>
                <Icon class="add-icon" type="ios-add-circle-outline" @click="addBill(id)" />
                <Icon class="remove-icon" type="ios-remove-circle-outline" @click="removeBill(id)" />
            </Row>
            <Row class="row input-center">
                <Col class="center" span="5">Total</Col>
                <Col class="center" span="3">
                    <Select v-model="statementData.currency" placeholder="">
                        <Option v-for="item in currencyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col class="center" span="9">
                    <Input v-model.trim="totalPrice" />
                </Col>
                <Col class="center" span="7">汇率{{ statementData.exchangeRate }}</Col>
            </Row>
            <Row class="row">
                <Col class="term" span="24">
                    <span>收款公司：</span>
                    <span>{{ statementData.collectingCompany }}</span>
                </Col>
            </Row>
            <Row class="row">
                <Col class="term" span="24">
                    <span>地址：</span>
                    <span>{{ statementData.collectingAddr }}</span>
                </Col>
            </Row>
            <Row class="row">
                <Col class="term" span="24">
                    <span>开户行：</span>
                    <span>{{ statementData.collectingBank }}</span>
                </Col>
            </Row>
            <Row class="row">
                <Col class="term" span="24">
                    <span>账户：</span>
                    <span>{{ statementData.collectingBankNo }}</span>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
    data() {
        return {
            statementData: {},
            billTable: [
                {
                    charges: '',
                    currency: '',
                    num: '',
                    price: '',
                    remark: '',
                }
            ],
            currencyList: [
                {
                    value: 'RMB',
                    label: 'RMB'
                },
                {
                    value: 'USD',
                    label: 'USD'
                },
                {
                    value: 'EUR',
                    label: 'EUR'
                }
            ],
        }
    },
    computed: {
        totalPrice: {
            get() {
                let price = 0
                this.billTable.map(item => {
                    // 先按照rmb算
                    let multiple = 1
                    if (item.currency === 'USD') {
                        multiple = this.statementData.exchangeRateUSD
                    } else if (item.currency === 'EUR') {
                        multiple = this.statementData.exchangeRateEUR
                    }
                    price = this.returnFloat(price) + this.returnFloat(item.num * item.price * multiple)
                    // rmb转其他币值
                    if (this.statementData.currency === 'USD') {
                        price = this.returnFloat(price / this.statementData.exchangeRateUSD)
                    } else if (this.statementData.currency === 'EUR') {
                        price = this.returnFloat(price / this.statementData.exchangeRateEUR)
                    }
                })
                return price || null
            },
            set() {}
        },
    },
    methods: {
        // 添加收费项
        addBill(val) {
            this.billTable.splice(val + 1, 0, {
                charges: '',
                currency: '',
                num: '',
                price: '',
                remark: ''
            })
        },
        // 移除收费项
        removeBill(val) {
            if(this.billTable.length > 1) {
                this.billTable.splice(val, 1)
            } else {
                this.$Message.error('至少保留一项！')
            }
        },
        // 保留两位小数不够补充00
        returnFloat(value) {
            value = Number(value)
            if (value === 0) {
                return value
            }
            var value = Math.round(parseFloat(value) * 100000) / 100000;
            return Number(value);
        },
        checkBill() {
            if (!this.statementData.consumer) {
                this.$Message.error('请填写Consumer！')
                return null
            }
            else if (!this.statementData.address) {
                this.$Message.error('请输入地址！')
                return null
            }
            else if (!this.statementData.openBank) {
                this.$Message.error('请输入开户行！')
                return null
            }
            else if (!this.statementData.bankNo) {
                this.$Message.error('请输入开户行账户！')
                return null
            }
            else if (!this.statementData.bookingNumber) {
                this.$Message.error('请输入订舱号！')
                return null
            }
            else if (!this.statementData.billTime) {
                this.$Message.error('请选择账单时间！')
                return null
            }
            for (let index = 0; index < this.billTable.length; index++) {
                const item = this.billTable[index]
                if (!item.charges) {
                    this.$Message.error('请填写收费项！')
                    return null
                }
                else if (!item.num) {
                    this.$Message.error('请输入数量！')
                    return null
                }
                else if (!item.currency) {
                    this.$Message.error('请选择币值！')
                    return null
                }
                else if (!item.price) {
                    this.$Message.error('请填写单价！')
                    return null
                }
                else if (!item.remark) {
                    this.$Message.error('请填写备注！')
                    return null
                }
            }
        },
    }
}
</script>

<style scoped lang="less">
    .bill-entry {
        background: white;
        margin: auto;
        width: 80%;
        border-right: 1px solid;
        border-bottom: 1px solid;

        .row {

            .title {
                height: 80px;
                line-height: 80px;
            }
        }
        .center {
            text-align: center;
        }

        .add-icon {
            position: absolute;
            right: -16px;
            top: 10px;
        }
        .remove-icon {
            position: absolute;
            right: -35px;
            top: 10px;
        }
        .ytxd-col {
            padding: 0 4px;
            border-left: 1px solid;
            border-top: 1px solid;
            height: 35px;
            line-height: 30px;
            :deep(.ytxd-input-wrapper ) {
                width: 75%;
                input {
                    border: none;
                    // text-align: center;
                    &:focus {
                        box-shadow: none;
                    }
                }
                .ytxd-input-suffix, .ytxd-input-suspension {
                    display: none;
                }
            }
            :deep(.ytxd-select) {
                div {
                    border: none;
                    box-shadow: none;
                }
                .ytxd-select-arrow {
                    display: none;
                }
            }
        }
        .input-center {
            /deep/.ytxd-input-wrapper input {
                text-align: center;
            }
        }
    }
</style>
```
<img src="../../../images/vue/单据.jpg" style="height:100%; width: 100%">
</details>


## 证书页面
利用`vue`栅格布局
<details><summary><b>详细代码及页面展示</b></summary>

```vue
<template>
    <div>
        <div class="bill-entry" id="genpdf">
            <Row class="row">
                <Col class="title" span="24"><h3>
                    <p>SHIPPING INSTRUCTIONS</p>
                    <p>货物运输委托书</p>
                </h3></Col>
            </Row>
            <Row class="row">
                <Col span="12" class="height200">
                    <div class="font-color">
                        <p>委托人/发货人 From Shipper("The Customer"):</p>
                        <!-- <p>公司中英文名字+地址+联系人电话邮箱(必填)</p> -->
                    </div>
                    <div class="font-color">
                        <span>公司中文名：</span>
                        <Input v-model.trim="billData.shipperCompanyCn" style="width: 60%" />
                    </div>
                    <div class="font-color">
                        <span>公司英文名：</span>
                        <Input v-model.trim="billData.shipperCompanyEn" style="width: 60%" />
                    </div>
                    <div class="font-color">
                        <span>公司地址：</span>
                        <Input v-model.trim="billData.shipperCompanyAdd" style="width: 60%" />
                    </div>
                    <div class="font-color">
                        <span>联系人电话：</span>
                        <Input v-model.trim="billData.shipperContactsPhone" style="width: 60%" />
                    </div>
                    <div class="font-color">
                        <span>联系人邮箱：</span>
                        <Input v-model.trim="billData.shipperContactsMail" style="width: 60%" />
                    </div>
                </Col>
                <Col span="12" class="height200">
                    <div class="height100">
                        <p>出口许可证号 Export Licnece No.</p>
                        <Input v-model.trim="billData.exportLicenseNumber" />
                    </div>
                    <div class="change-box">
                        <p>产地证号 Cert Of Origin No.</p>
                        <Input v-model.trim="billData.certificateNo" />
                    </div>
                </Col>
            </Row>
            <Row class="row">
                <Col span="12" class="height200">
                    <div class="font-color">
                        <p>收货人 Consignee:</p>
                        <!-- <p>公司中英文名字+地址+联系人电话邮箱(必填)</p> -->
                    </div>
                    <div class="font-color">
                        <span>公司中文名：</span>
                        <Input v-model.trim="billData.consigneeCompanyCn" style="width: 60%" />
                    </div>
                    <div class="font-color">
                        <span>公司英文名：</span>
                        <Input v-model.trim="billData.consigneeCompanyEn" style="width: 60%" />
                    </div>
                    <div class="font-color">
                        <span>公司地址：</span>
                        <Input v-model.trim="billData.consigneeCompanyAdd" style="width: 60%" />
                    </div>
                    <div class="font-color">
                        <span>联系人电话：</span>
                        <Input v-model.trim="billData.consigneeContactsPhone" style="width: 60%" />
                    </div>
                    <div class="font-color">
                        <span>联系人邮箱：</span>
                        <Input v-model.trim="billData.consigneeContactsMail" style="width: 60%" />
                    </div>
                </Col>
                <Col span="12" class="height200">
                    <p>承运人/代理 To The Agent:</p>
                    <Input v-model.trim="billData.carrier" type="textarea" :rows="6" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="12" class="height200">
                    <p>通知人 Notify Party:</p>
                    <!-- <p>公司中英文名字+地址+联系人电话邮箱</p> -->
                    <div>
                        <span>公司中文名：</span>
                        <Input v-model.trim="billData.notifierCompanyCn" style="width: 60%" />
                    </div>
                    <div>
                        <span>公司英文名：</span>
                        <Input v-model.trim="billData.notifierCompanyEn" style="width: 60%" />
                    </div>
                    <div>
                        <span>公司地址：</span>
                        <Input v-model.trim="billData.notifierCompanyAdd" style="width: 60%" />
                    </div>
                    <div>
                        <span>联系人电话：</span>
                        <Input v-model.trim="billData.notifierContactsPhone" style="width: 60%" />
                    </div>
                    <div>
                        <span>联系人邮箱：</span>
                        <Input v-model.trim="billData.notifierContactsMail" style="width: 60%" />
                    </div>
                </Col>
                <Col span="12" class="height200">
                    <div class="height100">
                        <!-- <p>运输费用 Rail Charges:</p> -->
                        <p>运输费用 Freight:</p>
                        <RadioGroup v-model="billData.transportationCharges" vertical>
                            <Radio label="toBePrepaid">
                                <span>预付To be prepaid</span>
                            </Radio>
                            <Radio label="toBeCollected">
                                <span>到付To be Collected(if Service Av ailable)</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                    <div class="height100 change-box">
                        <p>其它杂费 Other Charges:</p>
                        <RadioGroup v-model="billData.otherCharges" vertical>
                            <Radio label="toBePrepaid">
                                <span>预付To be prepaid</span>
                            </Radio>
                            <Radio label="toBeCollected">
                                <span>到付To be Collected(if Service Av ailable)</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </Col>
            </Row>
            <Row class="row">
                <Col span="6">
                    <span>主单号 MAWB NO.</span>
                    <Input class="width80" v-model.trim="billData.masterBill" />
                </Col>
                <Col span="6">
                    <span>分单号 HAWB NO.</span>
                    <Input class="width80" v-model.trim="billData.houseBill" />
                </Col>
                <Col span="12">
                    <span>货物原产地 Country of Origin(Goods)</span>
                    <Input v-model.trim="billData.originGoods" style="width: 140px;" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="6" class="height150">
                    <div class="height75">
                        <span>承运人 Name of Carrier</span>
                        <Input v-model.trim="billData.agent" />
                    </div>
                    <div class="height75 change-box">
                        <span class="font-color">到达站/目的港 Destination</span>
                        <Input v-model.trim="billData.destination" />
                    </div>
                </Col>
                <Col span="6" class="height150">
                    <div class="height75">
                        <span class="font-color">始发站/起运港 Departure</span>
                        <Input v-model.trim="billData.placeOrigin" />
                    </div>
                    <div class="height75 change-box">
                        <span class="font-color">班列时间/船期 Date</span>
                        <Input v-model.trim="billData.shipDate" />
                    </div>
                </Col>
                <Col span="12" class="height150">
                    <p>特殊要求 Special Instructions:</p>
                    <CheckboxGroup v-model="billData.specialRequirements">
                        <div>
                            <Checkbox label="exportClearance" style="margin-right: 20px;">出口报关export clearance</Checkbox>
                            <Checkbox label="pickUp">提货pick up</Checkbox>
                        </div>
                        <div>
                            <Checkbox label="insurance" style="margin-right: 20px;">保险 insurance</Checkbox>
                            <Checkbox label="impportClearance" style="margin-right: 20px;">进口清关import clearance</Checkbox>
                            <Checkbox label="delivery">送货delivery</Checkbox>
                        </div>
                    </CheckboxGroup>
                </Col>
            </Row>
            <Row class="row">
                <Col span="5" class="text-center">
                    <span class="font-color">No.of Pieces 件数</span>
                </Col>
                <Col span="5" class="text-center">
                    <span class="font-color">Gross Weight 毛重</span>
                </Col>
                <Col span="9" class="text-center">
                    <span class="font-color">Nature and Quantity of Goods货物描述（中英文）</span>
                </Col>
                <Col span="5" class="text-center">
                    <span class="font-color">Measurement 尺寸</span>
                </Col>
            </Row>
            <Row class="row">
                <Col span="5" class="height150 center">
                <CheckboxGroup v-model="billData.kindPackage">
                    <div><Checkbox label="CASES">此票CASES</Checkbox></div>
                    <div><Checkbox label="CTNS">纸箱CTNS</Checkbox></div>
                    <div><Checkbox label="PLTS">托盘PLTS</Checkbox></div>
                    <div><Checkbox label="PKGS">袋/件PKGS</Checkbox></div>
                    <div><Checkbox label="40C">40整箱</Checkbox></div>
                </CheckboxGroup>
                </Col>
                <Col span="5" class="height150">
                    <Input v-model.trim="billData.roughWeight" type="textarea" :rows="6" />
                </Col>
                <Col span="9" class="height150">
                    <Input v-model.trim="billData.descriptionGoods" type="textarea" :rows="6" />
                </Col>
                <Col span="5" class="height150">
                    <Input v-model.trim="billData.size" type="textarea" :rows="6" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="4">
                    <!-- 指定货币 -->
                    <span>Specify Currency：</span>
                    <Input class="width50" v-model.trim="billData.specifyCurrency" />
                </Col>
                <Col span="5">
                    <!-- 海关申报价值 -->
                    <span>Declared Value for Customs:</span>
                    <Input class="width50" v-model.trim="billData.declaredValueForCustoms" />
                </Col>
                <Col span="5">
                    <!-- 申报运输价值 -->
                    <span>Declared Value for Carriage:</span>
                    <Input class="width50" v-model.trim="billData.declaredValueForCarriage" />
                </Col>
                <Col span="4">
                    <!-- 保险费用 -->
                    <span>Insurance Amount:</span>
                    <Input class="width50" v-model.trim="billData.insuranceAmount" />
                </Col>
                <Col span="6">
                    <!-- 托运人信用证 -->
                    <span>Shipper's C.O.D.:</span>
                    <Input class="width80" v-model.trim="billData.shippersCod" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="12">
                    <span>Signatory's Name in Block Letters</span>
                </Col>
                <Col span="12">
                    <span>盖章签字 Signature and Stamp</span>
                </Col>
            </Row>
        </div>
        <Button type="primary" @click="downloadPdf" style="width: 150px; margin: 20px calc(50% - 75px);">下载pdf</Button>
    </div>
</template>

<script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
    data() {
        return {
            billData: {
                transportationCharges: 'toBePrepaid',
                otherCharges: 'toBePrepaid'
            },
        }
    },
    methods: {
        // 下载生成pdf
        downloadPdf() {
            let check = this.checkBill()
            if (check !== null) {
                html2Canvas(document.querySelector("#genpdf"), {
                    allowTaint: false,
                    useCORS: true, // allowTaint、useCORS只能够出现一个
                    imageTimeout: 0,
                    dpi: 500, // 像素
                    scale: 4, // 图片大小
                    }).then(function (canvas) {
                    // 用于将canvas对象转换为base64位编码
                    let pageData = canvas.toDataURL("image/jpeg", 1.0),
                        canvasWidth = canvas.width,
                        canvasHeight = canvas.height,
                        concentWidth = 500,
                        concentHeight = Math.round((concentWidth / canvasWidth) * canvasHeight),
                        position = 72,
                        pageHeight = 892,
                        height = concentHeight;
                    // 新建一个new JsPDF，A3的像素大小 842*1191，A4的像素大小 592*841。这个px像素不准确，不清楚他们的像素大小来源如何
                    let PDF = new JsPDF("p", "px", "a3");
                    if (height <= pageHeight) {
                        // 添加图片
                        PDF.addImage(
                            pageData,
                            "JPEG",
                            68,
                            position,
                            concentWidth,
                            concentHeight
                        );
                    } else {
                        while (height > 0) {
                            PDF.addImage(
                                pageData,
                                "JPEG",
                                68,
                                position,
                                concentWidth,
                                concentHeight
                            );
                            height -= pageHeight;
                            position -= pageHeight;
                            if (height > 0) {
                                PDF.addPage();
                            }
                        }
                    }
                    // 保存 pdf 文档
                    PDF.save(`${"委托单"}.pdf`)
                })
            }
        },
        checkBill() {
            if (!this.billData.shipperCompanyCn) {
                this.$Message.error('请填写委托人/发货人公司中文名！')
                return null
            }
            else if (!this.billData.shipperCompanyEn) {
                this.$Message.error('请填写委托人/发货人公司英文名！')
                return null
            }
            else if (!this.billData.shipperCompanyAdd) {
                this.$Message.error('请填写委托人/发货人公司地址！')
                return null
            }
            else if (!this.billData.shipperContactsPhone) {
                this.$Message.error('请填写委托人/发货人公司联系人电话！')
                return null
            }
            else if (!this.billData.shipperContactsMail) {
                this.$Message.error('请填写委托人/发货人公司联系人邮箱！')
                return null
            }
            else if (!this.billData.consigneeCompanyCn) {
                this.$Message.error('请填写收货人公司中文名！')
                return null
            }
            else if (!this.billData.consigneeCompanyEn) {
                this.$Message.error('请填写收货人公司英文名！')
                return null
            }
            else if (!this.billData.consigneeCompanyAdd) {
                this.$Message.error('请填写收货人公司地址！')
                return null
            }
            else if (!this.billData.consigneeContactsPhone) {
                this.$Message.error('请填写收货人公司联系人电话！')
                return null
            }
            else if (!this.billData.consigneeContactsMail) {
                this.$Message.error('请填写收货人公司联系人邮箱！')
                return null
            }
            else if (!this.billData.placeOrigin) {
                this.$Message.error('请填写始发站/起运港 Departure！')
                return null
            }
            else if (!this.billData.destination) {
                this.$Message.error('请填写到达站/目的港 Destination！')
                return null
            }
            else if (!this.billData.shipDate) {
                this.$Message.error('请填写班列时间/船期 Date！')
                return null
            }
            else if (!this.billData.kindPackage.length) {
                this.$Message.error('请选择No.of Pieces 件数！')
                return null
            }
            else if (!this.billData.roughWeight) {
                this.$Message.error('请填写Gross Weight 毛重！')
                return null
            }
            else if (!this.billData.descriptionGoods) {
                this.$Message.error('请填写Nature and Quantity of Goods货物描述（中英文）！')
                return null
            }
            else if (!this.billData.size) {
                this.$Message.error('请填写Measurement 尺寸！')
                return null
            }
        },
    }
}
</script>

<style scoped lang="less">
    .bill-entry {
        background: white;
        margin: auto;
        width: 80%;
        border-right: 1px solid;
        border-bottom: 1px solid;
        font-size: 12px;

        .row {
            // border: 1px solid;
            // border-bottom: 0px;

            // .term {
            //     padding: 0 4px;
            //     border-left: 1px solid;
            //     border-top: 1px solid;
            // }

            .title {
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            .height150 {
                height: 150px;
            }
            .height180 {
                height: 180px;
            }
            .height200 {
                height: 200px;
            }
            .height100 {
                height: 90px;
            }
            .height75 {
                height: 75px;
            }
            .center {
                display: grid;
                justify-content: center;
            }
            .width50 {
                width: 50px;
            }
            .width80 {
                width: 80px;
            }
            .font-color {
                color: #FF001B;
                // color: #F13F28;
            }
            .change-box{
                width: calc(100% + 8px);
                margin-left: -4px;
                padding: 0 4px;
                border-top: 1px solid;
            }
            .text-center {
                text-align: center;
            }
        }

        .add-icon {
            position: absolute;
            right: -16px;
            top: 10px;
        }
        .remove-icon {
            position: absolute;
            right: -35px;
            top: 10px;
        }
        // .ytxd-row {
        //     padding: 0 4px;
        // }
        .ytxd-col {
            padding: 0 4px;
            border-left: 1px solid;
            border-top: 1px solid;
            height: 35px;
            line-height: 30px;
            // span {
            //     flex-shrink: 0;
            //     margin-right: 12px;
            // }
            :deep(.ytxd-input-wrapper ) {
                // width: 200px;
                input {
                    border: none;
                    &:focus {
                        box-shadow: none;
                    }
                }
                textarea {
                    border: none;
                    resize: none;
                    &:focus {
                        box-shadow: none;
                    }
                }
            }
            .ytxd-checkbox-wrapper {
                font-size: 12px;
            }
            span.ytxd-radio + * {
                font-size: 12px;
            }
        }
    }
</style>
```
<img src="../../../images/vue/证书.jpg" style="height:100%; width: 100%">
</details>

