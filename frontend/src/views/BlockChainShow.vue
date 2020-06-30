<template>
    <div class="block">
        <el-container>
            <el-timeline>
                <el-timeline-item v-for="block in blocks" :key="block.block_id" :timestamp="block.time_stamp" placement="top">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>块高度：</span><span>{{block.block_id}}</span>
                            <br><br>
                            <span>头哈希：</span><span>{{block.head_hash}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'申请记录 ' + o }}
                        </div>
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
                    {
                        timestamp: "2019-9-8",
                        head_hash: "assad",
                        block_id: "13245"
                    },
                    {
                        timestamp: "2019-10-8",
                        head_hash: "assad",
                        block_id: "13245"
                    }
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
</style>