<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">区块链借贷系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="80px">
                <el-form-item label="用户ID" prop="name">
                    <el-input v-model="loginUser.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" @keyup.enter.native="submitForm('loginForm')">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="userType">
                    <el-select v-model="loginUser.userType" placeholder="借贷方">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
                </el-form-item>
                <!--                <div class="tiparea">-->
                <!--                    <p>还没有账号？现在-->
                <!--                        <router-link to='/register'>注册</router-link>-->
                <!--                    </p>-->
                <!--                </div>-->
            </el-form>
        </section>
    </div>
</template>

<script>
    import jwt_decode from "jwt-decode";
    import qs from 'qs';

    export default {
        name: "login",
        data() {
            return {
                loginUser: {
                    name: "",
                    password: "",
                    userType: '0',
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: "用户名格式不正确",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {min: 4, max: 30, message: "长度在 4 到 30 个字符", trigger: "blur"}
                    ],
                    userType: [
                        {required: true, message: "不能为空", trigger: "blur"},
                    ]
                },
                options: [{
                    value: '0',
                    label: '借贷方'
                }, {
                    value: '1',
                    label: '平台方'
                }, {
                    value: '2',
                    label: '资金方'
                }],
                beginTime: "", endTime: "",
            };
        },
        created() {
            let t = localStorage.needLogin * 1;
            console.log(t);
            if (t === 1) {
                this.$message.error('请先登录');
            }
            this.$notify({
                title: '测试账户1(借贷方)',
                dangerouslyUseHTMLString: true,
                message: 'ID : 1042120<br>密码 : u0IPNY',
                duration: 15000,
                type: 'warning'
            });
            // clearTimeout(t);
            // setTimeout(function () {
            this.$notify({
                title: '测试账户2(平台方)',
                dangerouslyUseHTMLString: true,
                message: 'ID : 1105965<br>密码 : dLO21D',
                duration: 15000,
                type: 'success',
                offset: 100,
            });
            this.$notify({
                title: '测试账户3(资金方)',
                dangerouslyUseHTMLString: true,
                message: 'ID : 1052596<br>密码 : hGc318',
                duration: 15000,
                type: "info",
                offset: 200,
            });
        },
        methods: {
            submitForm(formName) {
                localStorage.removeItem('eleToken');
                let name = this.loginUser.name;
                let password = this.loginUser.password;
                console.log(this.loginUser, name, password);
                this.beginTime = +new Date();
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let js = {
                            id: this.loginUser.name,
                            password: this.loginUser.password
                        };
                        console.log(this.loginUser);
                        localStorage.setItem('userType', this.loginUser.userType);
                        if (this.loginUser.userType * 1 === 0) {
                            this.$axios.post("/borrowers/login", js).then(res => {
                                if (res.data.code * 1 === 0) {
                                    // 登录成功
                                    this.endTime = +new Date();

                                    const token = res.data.data['access-token'];
                                    console.log("res:", res.data, token);
                                    localStorage.setItem('eleToken', token);
                                    console.log("storage:", localStorage);
                                    this.$message({message: "登陆成功", type: "success"});
                                    this.$router.push("/my-platform");
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            }, err => {
                                this.$message.error(err.message);
                            });
                        } else if (this.loginUser.userType * 1 === 1) {
                            this.$axios.post("/platforms/login", js).then(res => {

                                if (res.data.code * 1 === 0) {
                                    // 登录成功
                                    const token = res.data.data['access-token'];
                                    console.log("res:", res.data, token);
                                    localStorage.setItem('eleToken', token);
                                    console.log("storage:", localStorage);
                                    this.$message({message: "登陆成功", type: "success"});
                                    this.$router.push("/my-client");
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            }, err => {
                                this.$message.error(err.message);
                            });
                        } else {
                            this.$axios.post("/merchants/login", js).then(res => {

                                if (res.data.code * 1 === 0) {
                                    // 登录成功
                                    const token = res.data.data['access-token'];
                                    console.log("res:", res.data, token);
                                    localStorage.setItem('eleToken', token);
                                    console.log("storage:", localStorage);
                                    this.$message({message: "登陆成功", type: "success"});
                                    this.$router.push("/my-own-platform");
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            }, err => {
                                this.$message.error(err.message);
                            });
                        }
                    } else {
                        this.$message.error("error submit!!");
                        return false;
                    }
                }, err => {
                    this.$message.error(err);
                    return false;
                });
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            },
            refresh() {
                this.getProfile();
            },
        }
    };
</script>

<style scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/01.jpeg) no-repeat center center;
        background-size: 100% 100%;
    }

    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 20%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }

    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }

    .tiparea p a {
        color: #409eff;
    }
</style>


