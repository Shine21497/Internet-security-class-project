<template>
    
    


    <div class="fillcontain">
        
        <!-- <createWindow :show.sync="dialogVisible" ></createWindow> -->
        <createWindow :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles"></createWindow>
        <!-- <mapInfo :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles"></mapInfo> -->




        <div style="margin: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户</el-breadcrumb-item>
                <el-breadcrumb-item>我参与维护的地图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin: 20px 0;"></div>
        <el-card style="margin: 20px;width: 100%;">
            <el-button @click="refresh">刷新</el-button>
            <el-button @click.native="dialogVisible = true">维护地图</el-button>
            <div style="margin: 20px 0;"></div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="province"
                        label="省市"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="创建时间"
                        sortable>
                </el-table-column>
                <!-- <el-table-column align="center" label="确认区块">
                    <template slot-scope="scope">
                        <el-button @click.prevent="confirm(scope.row,scope.$index)"> 确认 </el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </el-card>
    </div>
</template>

<script>

    import createWindow from '../components/CreateWindow'

    export default {
        name: "MyMap",
        data() {
            return {
                tableData: [],
                //控制弹窗 显示
                dialogVisible: false,
            　　　 //点击查看按钮  这条数据详细信息
                dialogInfo:{},
            }
        },
        created() {
            this.getProfile();
        },
        components: {
            createWindow,
        },
        methods: {
            getProfile() {
                let userName = localStorage.getItem('userName');
                let params = {
                    userName: userName,
                };
                this.$axios.post('/api/map/get_map', params)
                    .then(res => {
                    //登录成功
                    console.log("data is:", res)
                    this.tableData = [];
                    let test_data = res.data;
                    
                    // for (let i = 0; i < res.data.data.length; ++i) {
                    for (let i = 0; i < test_data.length; ++i) {
                        this.tableData.push({
                            province: test_data[i].province,
                            name: test_data[i].name,
                            date: test_data[i].date
                        });
                    }
                }, err => {
                    this.$message.error(err.message);
                });
            },
            refresh() {
                this.getProfile();
            },
            create() {
                console.log("Create a new map!");
                // this.getProfile();
                this.dialogVisible = true;
                this.dialogInfo = {};    
            },
            dialogVisibles(v){
                this.dialogVisible = v;
            },
            confirm(row){
            //   console.log(row)
                row.state = "确认区块";
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
