<template>
    <div class="fillcontain">
        <div style="margin: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>平台方</el-breadcrumb-item>
                <el-breadcrumb-item>给我注资的资金方</el-breadcrumb-item>
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
                        label="资金方ID"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        sortable>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "MyMerchant",
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            this.getProfile();
        },
        methods: {
            getProfile() {
                let js = {};
                this.$axios.post("/platforms/search-merchant", js,
                    {
                        params: {access_token: localStorage.getItem('eleToken')}
                    }).then(res => {
                    // 登录成功
                    if (res.data.code * 1 === 0) {
                        this.$message({message: "查询成功", type: "success"});
                        console.log(res.data);
                        this.tableData = [];
                        for (let i = 0; i < res.data.data.length; ++i) {
                            this.tableData.push({
                                id: res.data.data[i].id,
                                name: res.data.data[i].name
                            });
                        }
                        // this.$router.push("/myfile");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }, err => {
                    this.$message.error(err.message);
                });
            },
            refresh(){
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
