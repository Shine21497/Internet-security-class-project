<template>
    <div class="fillcontain">
        <div style="margin: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{userTypeName}}</el-breadcrumb-item>
                <el-breadcrumb-item>查询信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin: 20px 0;"></div>
        <el-card style="margin: 20px;width: 100%;">
            <el-button @click="refresh">刷新</el-button>
            <div style="margin: 20px 0;"></div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="Name"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="value"
                        label="Value"
                        sortable>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Query",
        data() {
            return {
                tableData: [],
                userTypeName: "",
                beginTime: "",
                endTime: "",
            }
        },
        created() {
            this.getProfile();
        },
        methods: {
            getProfile() {
                let userType = localStorage.getItem('userType') * 1;
                this.userTypeName = this.userType === 0 ? '借贷方' : this.userType === 1 ? '平台方' : '资金方';
                let wantID = localStorage.getItem('wantID');
                let aim = localStorage.getItem('aim');
                let js = {id: wantID, aim: aim, platform_id: localStorage.getItem('wantPlatform')};
                console.log(js);
                this.beginTime = +new Date();
                if (userType === 1) {
                    this.$axios.post("/platforms/search-specific", js,
                        {
                            params: {access_token: localStorage.getItem('eleToken')}
                        }).then(res => {
                        if (res.data.code * 1 === 0) {
                            this.endTime = +new Date();
                            this.$notify({
                                title: '区块链时间',
                                dangerouslyUseHTMLString: true,
                                message: (this.endTime - this.beginTime) / 1000 + "s",
                                duration: 15000,
                                type: "info",
                                offset: 400,
                            });

                            this.tableData = [];
                            this.$message({message: "查询成功", type: "success"});
                            let data = res.data.data;
                            this.tableData.push({name: "系统编号", value: data.id});
                            this.tableData.push({name: "姓名", value: data.name});
                            this.tableData.push({name: "身份证号", value: data.ID_card});
                            this.tableData.push({name: "性别", value: data.gender === 'male' ? '男' : '女'});
                            this.tableData.push({name: "出生日期", value: data.birth_date});
                            this.tableData.push({name: "地址", value: data.address});
                            this.tableData.push({name: "手机号", value: data.phone});
                            this.tableData.push({name: "银行卡号", value: data.card_number});
                            this.$message('查询成功,您的查询行为已被记入区块链网络');
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    }, err => {
                        this.$message.error(err.message);
                    });
                } else if (userType === 2) {
                    this.$axios.post("/merchants/search-specific", js,
                        {
                            params: {access_token: localStorage.getItem('eleToken')}
                        }).then(res => {
                        // 登录成功
                        console.log(res);
                        if (res.data.code * 1 === 0) {
                            this.endTime = +new Date();
                            this.$notify({
                                title: '区块链查询时间',
                                dangerouslyUseHTMLString: true,
                                message: (this.endTime - this.beginTime) / 1000 + "s",
                                duration: 15000,
                                type: "info",
                                offset: 400,
                            });
                            this.tableData = [];
                            this.$message({message: "查询成功", type: "success"});
                            let data = res.data.data;
                            this.tableData.push({name: "系统编号", value: data.id});
                            this.tableData.push({name: "姓名", value: data.name});
                            this.tableData.push({name: "身份证号", value: data.ID_card});
                            this.tableData.push({name: "性别", value: data.gender === 'male' ? '男' : '女'});
                            this.tableData.push({name: "出生日期", value: data.birth_date});
                            this.tableData.push({name: "地址", value: data.address});
                            this.tableData.push({name: "手机号", value: data.phone});
                            this.tableData.push({name: "银行卡号", value: data.card_number});
                            this.$message('查询成功,您的查询行为已被记入区块链网络');
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    }, err => {
                        this.$message.error(err.message);
                    });
                }
            },
            refresh() {
                this.getProfile();
            },
        }
    }
</script>

<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
