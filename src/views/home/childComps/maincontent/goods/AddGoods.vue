<template>
  <div id="add-goods">
    <crumbs/>
    <el-card class="el-card">
      <!-- 顶部提示 -->
      <el-alert title="添加商品信息" type="info" :closable="false" show-icon center></el-alert>
      <!-- 步骤条 -->
      <el-steps align-center :active="activeIndex-0" finish-status="success" class="el-steps">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 组合表单标签页 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-position="top" class="demo-ruleForm">
        <!-- 标签页 -->
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeLeaveTab" @tab-click="clickTab">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="addForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model.number="addForm.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model.number="addForm.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model.number="addForm.goods_number"></el-input>
              </el-form-item>
              <!-- 级联选择器 -->
              <el-form-item label="商品分类" prop="goods_cat">
                <el-cascader v-model="addForm.goods_cat" :options="goodsCate" :props="addFormProps"
                  @change="changeGoodsCate"></el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <el-form-item :label="item.attr_name" v-for="item in manyTableDate" 
                :key="item.attr_id">
                <!-- 复选框 -->
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox :label="tag" v-for="(tag, indey) in item.attr_vals2" :key="indey" 
                    :border="true"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <el-form-item :label="item.attr_name" v-for="(item, indey) in onlyTableDate" :key="indey">
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <el-upload class="upload-demo" :action="uploadPicURL" :headers="headersObj"
                :on-preview="handlePicPreview" :on-remove="handlePicRemove" :on-success="handlePicSuccess"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <quill-editor ref="myQuillEditor" v-model="addForm.goods_introduce"/> 
              <el-button type="primary" class="add-good" @click="clickAddGood">添加商品</el-button> 
            </el-tab-pane>    
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="提示" :visible.sync="preViewPicVisible" width="50%" :before-close="closePreViewPic">
      <img :src="previewPic" class="preview-pic">
    </el-dialog>
  </div>
</template>

<script>
import Crumbs from 'components/common/Crumbs'

import {getAllGoodsCateList, getGoodParams, addGoods} from '@/network/home'
export default {
  components: {
    Crumbs
  },
  data() {
    return {
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        // 分类绑定
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addFormRules: {
        goods_name: [
          { required: true, message: '请填写商品名称', trigger: 'blur' },
          { min: 2, message: '商品名称长度不足', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请填写商品价格', trigger: 'blur' },
          { type: 'number', message: '商品价格必须为数字值'},
          { type: 'number', min: 0.01, message: '商品价格不能小于0.01'},
        ],
        goods_number: [
          { required: true, message: '请填写商品重量', trigger: 'blur' },
          { type: 'number', message: '商品重量必须为数字值'},
          { type: 'number', min: 1, message: '商品数量不能为空'}
        ],
        goods_weight: [
          { required: true, message: '请填写商品数量', trigger: 'blur' },
          { type: 'number', message: '商品数量必须为数字值'},
        ],
        goods_cat: [
          { required: true, message: '请填写商品分类', trigger: 'blur' }
        ]
      },
      // 级联规则
      addFormProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children' 
      },
      // 分类列表
      goodsCate: [],
      manyTableDate: [],
      onlyTableDate: [],
      uploadPicURL: 'http://timemeetyou.com:8889/api/private/v1/upload',
      headersObj: {Authorization: window.sessionStorage.getItem('token')},
      previewPic: '',
      preViewPicVisible: false
    }
  },
  created() {
    this.getAllGoodsCateList();
  },
  methods: {
    changeGoodsCate() {
      // 不允许选中三级以外分类
      if(this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },
    getAllGoodsCateList() {
      getAllGoodsCateList().then(res => {
        this.goodsCate = res.data;
      })
    },
    beforeLeaveTab(activeName, oldActiveName) {
      if((oldActiveName === '0') && ((this.addForm.goods_cat.length !== 3) 
        || (this.addForm.goods_name === '') || (this.addForm.goods_number < 1))) {
        this.$message.error('请先完成基础信息的填写');
        return false;
      }
    },
    clickTab() {
      if(this.activeIndex === '1') {
        getGoodParams(this.addForm.goods_cat[2], {sel: 'many'}).then(res => {
          res.data.forEach(item => {
            item.attr_vals = (item.attr_vals.length === 0) ? [] : item.attr_vals.split(" ");
            // 用于渲染复选框项，与复选框绑定值区分
            item.attr_vals2 = [];
            item.attr_vals2 = [...item.attr_vals];
          })
          this.manyTableDate = res.data;
          console.log(this.manyTableDate);
        })
      };
      if(this.activeIndex === '2') {
        getGoodParams(this.addForm.goods_cat[2], {sel: 'only'}).then(res => {
          console.log(res);
          this.onlyTableDate = res.data;
        })
      }
    },
    handlePicPreview(file) {
      this.previewPic = file.url;
      // this.previewPic = file.response.data.url;
      this.preViewPicVisible = true;
    },
    handlePicRemove(file) {
      if(!file.response) {return}
      let removePic = file.response.data.tmp_path;
      let removeIndex = this.addForm.pics.findIndex(item => {
        return item.pic === removePic;
      })
      this.addForm.pics.splice(removeIndex, 1)
    },
    handlePicSuccess(res) {
      console.log(res.data.tmp_path);
      let newPic = {pic: res.data.tmp_path};
      this.addForm.pics.push(newPic);
    },
    closePreViewPic() {
      this.preViewPicVisible = false;
      this.previewPic = '';
    },
    clickAddGood() {
      this.$refs.addForm.validate(valid => {
        if(!valid) {
          this.$message.error('请填写必要的表单项！');
          return
        }
        /* 深拷贝 */
        const Form = JSON.parse(JSON.stringify(this.addForm));
        // 选中分类转化为字符串
        Form.goods_cat = Form.goods_cat.join(',');
        // 选中参数转化为字符串
        this.manyTableDate.forEach(item => {
          const attrInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(attrInfo);
        })
        this.onlyTableDate.forEach(item => {
          const attrInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(attrInfo);
        })
        Form.attrs = this.addForm.attrs;
        // 添加商品
        addGoods(Form).then(res => {
          // 添加图片会有响应bug
          console.log(res);
          if(res.meta.status === 201 || res.meta.status === 400) {
            this.$message.success('添加商品成功');
            this.$router.replace('/home/goods');
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
#add-goods {
  .el-card {
    margin-top: 14px;
  }
  .el-steps {
    margin: 16px 0;
  }
  .el-checkbox {
    margin: 0 5px 5px 0 !important;
  }
  .add-good {
    margin-top: 15px;
  }
}
.el-upload__tip {
  height: 20px  !important;
}
.preview-pic {
  width: 100%;
}

</style>