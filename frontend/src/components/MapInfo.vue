
<template>
  <el-dialog title="地图信息" :visible.sync="dialogVisible" :before-close="cancelDialog" >
    <el-form class="form">
    
    <el-table-column label="头像">
    　　<template slot-scope="scope">
　　　  　<img :src="scope.row.img" width="40" height="40" class="head_pic"/>
　　    </template>
    </el-table-column>

    





    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="cancelDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
//父组件 传 过来的 值
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
　　//监听 弹窗显示， 可以用来写 请求接口
    dialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "mapInfo",
  data() {
    return {
        img: "./test_img.png",
    };
  },
  created() {},
  mounted() {},
  methods: {
   //修改父组件传过来的值
    cancelDialog() {
      this.$emit("update:dialogVisible", false);
    },


  }
};
</script>
<style  scoped>
.form{
    /* background: #eee; */
    padding: 0 10px;
}
.dialog-footer{
    text-align: center;
}
</style>