<template>
    <div>
        <div class="header-nav">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index='0'>
                    <!--                    <img src="../assets/logo.png" class='logo' alt="">-->
                    <span class='title'>区块链Demo</span></el-menu-item>
                <el-menu-item style="float:left" index='1'>{{Head}}</el-menu-item>
                <el-menu-item style="float:right" index=3>
                    <el-button type="primary" icon="el-icon-user-solid" @click="logout">退出登陆</el-button>
                </el-menu-item>
            </el-menu>
        </div>

        <div>
            <el-row class="menu_page">
                <el-col>
                    <el-menu
                            mode="vertical"
                            background-color="#324057"
                            text-color="#fff"
                            active-text-color="#409eff"
                            class="el-menu-vertical-demo"
                    >
                        <div v-if="userType===0">
                            <router-link v-for="menu in leftBarMenu" :to=menu.link>
                                <el-menu-item index=index>
                                    <i :class="menu.icon"></i>
                                    <span slot="title">{{menu.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </div>
                        <div v-else-if="userType===1">
                            <router-link v-for="menu in leftBarMenu2" :to=menu.link>
                                <el-menu-item index=index>
                                    <i :class="menu.icon"></i>
                                    <span slot="title">{{menu.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </div>
                        <div v-else-if="userType===2">
                            <router-link v-for="menu in leftBarMenu3" :to=menu.link>
                                <el-menu-item index=index>
                                    <i :class="menu.icon"></i>
                                    <span slot="title">{{menu.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </div>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: "head-nav",
        data() {
            return {
                Head: "",
                activeIndex: '1',
                permission: 2, //用户类型
                userType: 0,
                leftBarMenu: [
                    {
                        name: "我的借贷平台",
                        link: "my-platform",
                        icon: "el-icon-time"
                    }, {
                        name: "我的个人信息",
                        link: "my-info",
                        icon: "el-icon-suitcase"
                    }, {
                        name: '信息被查询记录',
                        link: "my-queried",
                        icon: "el-icon-document"
                    },
                ],
                leftBarMenu2: [
                    {
                        name: "我的客户",
                        link: "my-client",
                        icon: "el-icon-time"
                    },
                    {
                        name: "给我注资的商户",
                        link: "my-merchant",
                        icon: "el-icon-suitcase"
                    },
                ],
                leftBarMenu3: [
                    {
                        name: "我注资的平台",
                        link: "my-own-platform",
                        icon: "el-icon-suitcase"
                    }
                ],
            };
        },
        created() {
            this.userType = localStorage.getItem('userType') * 1;
            this.Head = this.userType === 0 ? '借贷方' : this.userType === 1 ? '平台方' : '商户方';
        },
        methods: {
            handleSelect(key, keyPath) {

            },
            logout() {
                localStorage.setItem('eleToken', "");
                this.$message({message: "退出成功", type: "success"});
                this.$router.push('/login');
            }
        }
    };
</script>

<style scoped>
    .head-nav {
        width: 100%;
        height: 60px;
        min-width: 600px;
        padding: 5px;
        background: #324057;
        color: #fff;
        border-bottom: 1px solid #1f2d3d;
    }

    .logo-container {
        line-height: 60px;
        min-width: 20px;
    }

    .logo {
        height: 50px;
        width: 50px;
        margin-right: 5px;
        vertical-align: middle;
        display: inline-bl;
    }

    .title {
        vertical-align: middle;
        font-size: 22px;
        font-family: "Microsoft YaHei";
        letter-spacing: 3px;
    }

    .user {
        line-height: 60px;
        text-align: right;
        float: right;
        padding-right: 10px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }

    .welcome {
        display: inline-block;
        width: auto;
        vertical-align: middle;
        padding: 0 5px;
    }

    .name {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
    }

    .comename {
        font-size: 12px;
    }

    .avatarname {
        color: #409eff;
        font-weight: bolder;
    }

    .username {
        cursor: pointer;
        margin-right: 5px;
    }

    .el-dropdown {
        color: #fff;
    }

    .topbar-account {
        float: right;
        padding-right: 9pt;
        font-size: 9pt
    }

    .topbar-btn {
        color: #fff
    }

    .topbar-btn:hover {
        background-color: #58b7ff
    }

    .menu_page {
        position: fixed;
        top: 71px;
        left: 0;
        min-height: 100%;
        /*width: 10%;*/
        background-color: #324057;
        z-index: 99;
    }

    .el-menu {
        border: none;
    }

    .fa-margin {
        margin-right: 5px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }

    .el-menu-vertical-demo {
        width: 35px;
    }

    .el-submenu .el-menu-item {
        min-width: 180px;
    }

    .hiddenDropdown,
    .hiddenDropname {
        display: none;
    }

    a {
        text-decoration: none;
    }
</style>
