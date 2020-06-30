<template>
    <el-container direction="vertical">
        <el-card style="margin: 20px;width: 100%;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" >
                <el-form-item label="所在省市">
                    <el-select v-model="formInline.province" placeholder="省市">
                        <el-option label="上海" value="上海"></el-option>
                        <el-option label="北京" value="北京"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区名(部分)">
                    <el-input v-model="formInline.region" placeholder="地区名"></el-input>
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
                        prop="name"
                        label="名称"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="省市"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="region"
                        label="区域名"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="操作"
                        sortable>
                    <template slot-scope="scope">
                        <el-button @click="handleCheck(scope.row)" type="text" size="small">下载</el-button>
                        <!-- <a class='download' :href='downloadhttp' download=""  title="下载">下载</a> -->
                    </template>
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
                    province: '',
                    region: ''
                },
                tableData:{

                }
            }
        },
        methods: {
            onSubmit() {
                this.$message('查询中');
                this.$axios
                    .get('/api/chain/querymap', {
                        params: {province: this.formInline.province, region:this.formInline.region}
                    })
                    .then(response =>{
                        this.tableData = [];
                        this.$message({message: "查询成功", type: "success"});
                        console.log(response.data);
                        for (let i = 0; i < response.data.length; ++i) {
                            this.tableData.push({
                                name: response.data[i].name,
                                province: response.data[i].province,
                                region: response.data[i].region,
                                path: response.data[i].map_file_location_encryption,
                            });
                        }
                    })
            },
            handleCheck(row) {
                console.log('row is: ', row);
                var path = row.path;
                  this.$axios({
                        method:'get',
                        params: {path: path},
                        url:'/api/map/download',
                        responseType:'blob',
                        })
                        .then((data) => {
                        if (!data) {
                        return
                        }
                        let url = window.URL.createObjectURL(data.data)
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', 'map.txt')
                        document.body.appendChild(link)
                        link.click()
                        })
            }
        }
    }
</script>

<style scoped>
 .el-container{
     padding: 50px 50px 50px 50px ;
 }
</style>