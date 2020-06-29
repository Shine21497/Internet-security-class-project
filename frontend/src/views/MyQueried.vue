<template>
    <div class="fillcontain">
        <div style="margin: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>借贷方</el-breadcrumb-item>
                <el-breadcrumb-item>我被查询记录(区块链)</el-breadcrumb-item>
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
                        prop="time"
                        label="查询时间"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="查询者ID"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="查询名称"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="查询者类型"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="aim"
                        label="查询者目的"
                        sortable>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "MyQueried",
        data() {
            return {
                tableData: [],
                beginTime: "",
                endTime: "",
            }
        },
        created() {
            this.getProfile();
        },
        methods: {
            getProfile() {
                let js = {};
                this.beginTime = +new Date();
                this.$axios.post("/borrowers/search-query", js,
                    {
                        params: {access_token: localStorage.getItem('eleToken')}
                    }).then(res => {
                    // 登录成功
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
                        this.$message({message: "查询成功", type: "success"});
                        console.log(res.data);
                        this.tableData = [];
                        for (let i = 0; i < res.data.data.length; ++i) {
                            this.tableData.push({
                                id: res.data.data[i].id,
                                name: res.data.data[i].name,
                                time: res.data.data[i].time,
                                type: res.data.data[i].category ? '平台方' : '资金方',
                                aim: res.data.data[i].aim,
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
