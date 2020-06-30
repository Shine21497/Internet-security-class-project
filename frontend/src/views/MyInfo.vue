<template>
    <div class="fillcontain">
        <div style="margin: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户</el-breadcrumb-item>
                <el-breadcrumb-item>我的个人信息</el-breadcrumb-item>
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
                        label="信息名"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="value"
                        label="内容"
                        sortable>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "MyInfo",
        data() {
            return {
                tableData:[],
            }
        },
        created() {
            this.getProfile();
        },
        methods: {
            getProfile() {
                let js = {};
                this.$axios.post("/api/users/user-info", js,
                    {
                        params: {userName: localStorage.getItem('userName'),}
                    }).then(res => {
                    console.log(res.data);
                    if (res.data.status == "OK") {

                        this.tableData = [];
                        
                        let userName = localStorage.getItem('userName');

                        let data = res.data.info;
                        
                        // let data = {
                        //     id:     userName,
                        //     name:   "张天骏",
                        //     ID_card: "410703199711083012",
                        //     gender:  'male',
                        //     birth_date: "1997.11.08",
                        //     address: "河南省新乡市牧野区解放路760厂家属院",
                        //     phone: "15801791260",
                        //     card_number: "6228480000009389090",
                        // };
                        this.tableData.push({name: "用户名", value: data.id});
                        this.tableData.push({name: "姓名", value:data.name});
                        this.tableData.push({name: "身份证号", value:data.ID_card});
                        this.tableData.push({name: "性别", value:data.gender==='male'?'男':'女'});
                        this.tableData.push({name: "出生日期", value:data.birth_date});
                        this.tableData.push({name: "地址", value:data.address});
                        this.tableData.push({name: "手机号", value:data.phone});
                        this.tableData.push({name: "银行卡号", value:data.card_number});
                        console.log(this.tableData);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }, err => {
                    this.$message.error(err.message);
                });
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