
<template>
  <el-dialog title="新增地图" :visible.sync="dialogVisible" :before-close="cancelDialog" >
    <el-form class="form">

    <el-form-item label="名字" prop="name">
        <el-input v-model="new_map.name" placeholder="请地图名称"></el-input>
    </el-form-item>

     <el-form-item label="位置" prop="position">
        <el-input v-model="new_map.position" placeholder="请地图所在地"></el-input>
    </el-form-item>
    
    <el-form-item label="文件路径" prop="filepath">
  


        <el-input v-model="new_map.filepath" placeholder="请输入地图文件路径"></el-input>
    </el-form-item>

<!--     
    <el-form-item label="预览图" prop="img">
              
       <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>


    </el-form-item> -->




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
  name: "createWindow",
  data() {
    return {
        new_map : {
            name: "",
            position: "",
            filepath: '',
        },
    };
  },
  created() {},
  mounted() {},
  methods: {
   //修改父组件传过来的值
    cancelDialog() {
      this.$emit("update:dialogVisible", false);
    },

     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }


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