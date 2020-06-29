import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http'
// import VueCookies from 'vue-cookies'
import VueRouter from 'vue-router'



// Vue.use(VueCookies);
// Vue.use(ElementUI);

Vue.use(VueRouter);
// Vue.http.options.credentials = true;

Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;
Vue.prototype.$left = 1;

Vue.prototype.download = function (row) {
    let fd = new FormData();
    fd.append('fileID', row.fileID);
    let instance = this.$notify({
        title: '消息',
        message: `正在拼命加载${row.name}中，请稍等...`,
        duration: 0,
        offset: 35
    });
    this.$axios({
        url: "/api/user/download",
        method: 'POST',
        responseType: 'blob',
        data: fd
    }).then(res => {
        instance.close();
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', row.name); //or any other extension
        document.body.appendChild(link);
        link.click();
    }, err => {
        this.$message.error("download fail");
    });
};

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
