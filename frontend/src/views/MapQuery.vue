<template>
    <el-container direction="vertical">
        <el-card style="margin: 20px;width: 100%;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" >
                <el-form-item label="所在省市">
                    <el-select v-model="formInline.region" placeholder="省市">
                        <el-option label="上海" value="shanghai"></el-option>
                        <el-option label="北京" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区名(部分)">
                    <el-input v-model="formInline.user" placeholder="地区名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <div style="margin: 20px 0;"></div>
            <el-table
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
                        prop="所属省市"
                        label="省市"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="区域名"
                        label="区域名"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="操作"
                        sortable>
                    <el-button>
                        下载
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>
    </el-container>
</template>

<script>
    export default {
        name: "MapQuery",
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                tableData:{

                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
 .el-container{
     padding: 50px 50px 50px 50px ;
 }
</style>