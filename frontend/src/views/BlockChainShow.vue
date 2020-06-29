<template>
    <div class="block">
        <el-container>
            <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>块高度：20879</span><br><br>
                            <span>头哈希：jshadkjahdkj</span>
                            <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'申请记录 ' + o }}
                        </div>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>块高度：20879</span><br><br>
                            <span>头哈希：jshadkjahdkj</span>
                            <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'申请记录 ' + o }}
                        </div>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>块高度：20879</span><br><br>
                            <span>头哈希：jshadkjahdkj</span>
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
        name: "BlockChainShow"
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