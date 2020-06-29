<template>
    
    


    <div class="fillcontain">
        
        <!-- <createWindow :show.sync="dialogVisible" ></createWindow> -->
        <mapInfo :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles"></mapInfo>



        <div style="margin: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户</el-breadcrumb-item>
                <el-breadcrumb-item>地图库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin: 20px 0;"></div>
        <el-card style="margin: 20px;width: 100%;">
            <el-button @click="refresh">刷新</el-button>
            <div style="margin: 20px 0;"></div>
            <el-table  @row-dblclick="dbSelected"
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="地图ID"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        sortable>
                </el-table-column>

                 <el-table-column
                        prop="state"
                        label="状态"
                        sortable>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import mapInfo from '../components/MapInfo'
    import createWindow from '../components/CreateWindow'

    export default {
        name: "MyPlatform",
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
            mapInfo,
        },
        methods: {
            getProfile() {
                let js = {};
                // this.$axios.post("/borrowers/search-platform", js,
                //     {
                //         params: {access_token: localStorage.getItem('eleToken')}
                //     }).then(res => {
                    // 登录成功
                    // console.log("data:", res.data)
                    // if (res.data.code * 1 === 0) {
                        this.tableData = [];
                        this.$message({message: "查询成功", type: "success"});
                        let test_data = [];
                        test_data.push({id: "000001", name: "济事楼318", state: "维护中"});
                        test_data.push({id: "000002", name: "电信学院地下车库", state: "确认区块"});
                        // for (let i = 0; i < res.data.data.length; ++i) {
                        for (let i = 0; i < test_data.length; ++i) {
                            this.tableData.push({
                                id: test_data[i].id,
                                name: test_data[i].name,
                                state: test_data[i].state
                            });
                        }
                        // this.$router.push("/myfile");
                    // } 
                    // else {
                //         this.$message.error(res.data.msg);
                //     }
                // }, err => {
                //     this.$message.error(err.message);
                // });
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
            dbSelected(row) {
                this.dialogVisible = true;
                this.dialogInfo = {};   
                console.log(row)      
                console.log("Double clicked!")
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
