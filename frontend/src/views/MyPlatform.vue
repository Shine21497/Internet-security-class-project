<template>
    <div class="fillcontain">
        <div style="margin: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>借贷方</el-breadcrumb-item>
                <el-breadcrumb-item>我注册的平台</el-breadcrumb-item>
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
                        label="平台ID"
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
        name: "MyPlatform",
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
                this.$axios.post("/borrowers/search-platform", js,
                    {
                        params: {access_token: localStorage.getItem('eleToken')}
                    }).then(res => {
                    // 登录成功
                    console.log("data:", res.data)
                    ;
                    if (res.data.code * 1 === 0) {
                        this.tableData = [];
                        this.$message({message: "查询成功", type: "success"});
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
