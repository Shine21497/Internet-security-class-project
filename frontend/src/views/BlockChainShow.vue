<template>
    <div class="block">
        <el-container>
            <el-timeline>
                <el-timeline-item v-for="block in blocks" :key="block.block_id" :timestamp="block.time_stamp" placement="top">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>块高度：</span><span>{{block.block_id}}</span>
                            <br><br>
                            <div class="longhash"><span>头哈希：</span>{{block.head_hash}}</div>
                            <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                        </div>
                        <el-card v-for="content in block.content"  :key="o" class="box-card" style="width:400px;padding: 20px 20px 20px 20px">
                            {{'省市: ' +  content.map_info.province}}<br><br>
                            {{'区域: ' +  content.map_info.region}}<br><br>
                            {{'地图文件名: ' +  content.map_info.name}}<br><br>
                            <div class="longhash">{{'地图文件哈希: ' +  content.map_info.map_file_hash}}<br><br></div>
                            {{'用户ID: ' +  content.user_info.userName}}<br><br>
                        </el-card>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "BlockChainShow",
        data() {
            return {
                blocks: [
                    
                ]
            }
        },
        mounted () {
            this.$axios
                .get('/api/chain/all')
                .then(response => {
                    this.blocks = response.data
                })
        },

    }
</script>

<style scoped>
    .el-container{
        padding: 50px 50px 50px 50px ;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .longhash{
        width: 200px;
        display: block;
        text-overflow: ellipsis;  /*超出内容用省略号*/
        overflow: hidden; /*内容超出后隐藏*/
        white-space: nowrap;
    }
</style>