<template>
    <div class="fillcontain">
        <div style="margin: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/my-own-platform'}">资金方</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/my-own-platform'}">我注资的平台</el-breadcrumb-item>
                <el-breadcrumb-item>平台客户</el-breadcrumb-item>
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
                        prop="id"
                        label="客户ID"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="客户姓名"
                        sortable>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleCheck(scope.row)" type="text" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="警告"
                :visible.sync="dialogVisible1"
                width="30%"
        >
            <p class="big">您将要查询{{wantID}}用户的个人隐私信息,您的行为将会计入区块链中<br>是否继续?</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="handleClickDialog1">继 续</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查询目的" :visible.sync="dialogVisible2">
            <el-form :model="form">
                <el-form-item label="请填写查询目的" :rules="rules" label-width="30%">
                    <el-autocomplete
                            class="inline-input"
                            v-model="form.aim"
                            style="width: 80%"
                            type="textarea"
                            :fetch-suggestions="querySearch"
                            :autosize="{ minRows: 3, maxRows: 30}"
                            placeholder=""
                            @select="handleSelect"
                            :maxlength="100"
                            show-word-limit
                            clearable
                    ></el-autocomplete>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="handleClick">查 询</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "MyOwnClient",
        data() {
            return {
                dialogVisible1: false,
                dialogVisible2: false,
                tableData: [],
                platform_id: "",
                wantID: "",
                form: {
                    aim: "",
                },
                rules: {
                    aim: [
                        {required: true, message: "不能为空", trigger: "blur"},
                    ]
                },
                models: [],
                sql: '',
                row: [],
            }
        },
        created() {
            this.platform_id = localStorage.getItem('wantPlatform');
            this.getProfile();
        },
        methods: {
            handleCheck(row) {
                this.wantID = row.id;
                this.dialogVisible1 = true;
            },
            handleClick() {
                this.$message('查询中');
                this.dialogVisible2 = false;
                localStorage.setItem("wantID", this.wantID);
                localStorage.setItem("aim", this.form.aim);
                this.$router.push('/query');
            },
            handleClickDialog1() {
                this.dialogVisible1 = false;
                this.dialogVisible2 = true;
            },
            getProfile() {
                let js = {platform_id: this.platform_id};
                this.$axios.post("/merchants/search-borrower", js,
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
                                name: res.data.data[i].name,
                            });
                        }
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }, err => {
                    this.$message.error(err.message);
                });
            },
            querySearch(queryString, cb) {
                let models = this.models;
                let results = queryString ? models.filter(this.createFilter(queryString)) : models;
                // 调用 callback 返回建议列表的数据
                cb(results);
            }
            ,
            createFilter(queryString) {
                return (model) => {
                    return (model.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            }
            ,
            loadAll() {
                return [
                    {"value": '信用评估'},
                    {"value": '贷前认证'},
                    {"value": '贷后清算'},

                ];
            }
            ,
            handleSelect(item) {
            },
            refresh(){
                this.getProfile();
            },
        },
        mounted() {
            this.models = this.loadAll();
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
    p.small {
        line-height: 90%
    }

    p.big {
        line-height: 200%
    }
</style>
