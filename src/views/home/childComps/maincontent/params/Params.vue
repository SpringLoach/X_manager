<template>
  <div id="params">
    <crumbs/>
    <el-card class="el-card">
      <!-- tip -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false">
      </el-alert>
      <!-- 商品分类 -->
      <div class="good-cate">
        <span class="good-cate-text">选择商品分类: </span>
        <el-cascader v-model="goodCate" :options="goodsCateList" :props="goodCateProps" :clearable="true"
            @change="goodCateChange"></el-cascader>
      </div>
      <!-- 标签分页 -->
       <el-tabs v-model="activeName" @tab-click="changeTabs">
        <!-- 动态参数标签页 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisable" class="add-params"
            @click="addParamsVisible = true">添加参数</el-button>
          <!-- 表格 -->
          <el-table :data="manyTableData" style="width: 100%" border stripe>
            <el-table-column type="expand">
              <!-- 展开行内容 -->
              <template slot-scope="scope">
                <el-tag class="attr-tag" v-for="(item, indez) in scope.row.attr_vals" :key="indez"
                  closable @close="closeElTag(scope, indez)">{{item}}</el-tag>
                <!-- 添加标签 -->
                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue"
                  ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope)" 
                  @blur="handleInputConfirm(scope)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" 
                  @click="showInput(scope)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称" width="280">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="clickEditorCate(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="clickDeleteCate(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性标签页 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisable" class="add-params"
            @click="addParamsVisible = true">添加属性</el-button>
          <!-- 表格 -->
          <el-table :data="onlyTableData" style="width: 100%" border stripe>
            <el-table-column type="expand">
              <!-- 展开行内容 -->
              <template slot-scope="scope">
                <el-tag class="attr-tag" v-for="(item, indez) in scope.row.attr_vals" :key="indez"
                  closable @close="closeElTag(scope, indez)">{{item}}</el-tag>
                <!-- 添加标签 -->
                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue"
                  ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope)" 
                  @blur="handleInputConfirm(scope)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" 
                  @click="showInput(scope)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称" width="280">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="clickEditorCate(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="clickDeleteCate(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
    </el-tabs>
    </el-card>
    <!-- 添加属性/参数对话框 -->
    <el-dialog :title="addParamsTitle" :visible.sync="addParamsVisible" width="50%" :before-close="closeAddParamsDialog">
    <el-form :model="addParamsForm" :rules="addParamsFormRules" ref="addParamsForm" label-width="80px" class="add-paramsForm">
      <el-form-item :label="paramsLabel" prop="attr_name">
        <el-input v-model="addParamsForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddParamsDialog">取 消</el-button>
        <el-button type="primary" @click="sureAddParamsDialog">确 定</el-button>
    </span>
    </el-dialog>
    <!-- 编辑属性/参数对话框 -->
    <el-dialog :title="editorParamsTitle" :visible.sync="editorParamsVisible" width="50%" :before-close="closeEditorParamsDialog">
    <el-form :model="editorParamsForm" :rules="editorParamsFormRules" ref="editorParamsForm" label-width="80px">
      <el-form-item :label="paramsLabel" prop="attr_name">
        <el-input v-model="editorParamsForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditorParamsDialog">取 消</el-button>
        <el-button type="primary" @click="sureEditorParamsDialog">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import Crumbs from 'components/common/Crumbs'

import {getAllGoodsCateList, getGoodParams, addGoodParams, searchGoodParams, 
  editorGoodParams, deleteGoodParams, addEditorGoodParams} from '@/network/home'

export default {
  components: {
    Crumbs
  },
  data() {
    return {
      // 级联绑定
      goodCate: [],
      // 级联配置
      goodCateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 数据源
      goodsCateList: [],
      // 活跃标签页
      activeName: 'many',
      // 前标签页
      beforeName: '',
      // 参数数据
      manyTableData: [],
      onlyTableData: [],
      // 展示添加属性
      addParamsVisible: false,
      // 表单绑定数据
      addParamsForm: {
        attr_name: ''
      },
      addParamsFormRules: {
        attr_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      editorParamsVisible: false,
      editorParamsForm: {
        attr_name: ''
      },
      editorParamsFormRules: {
        attr_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      // 预编辑ID
      readyEditorCateId: null,
      // 动态标签处理情况
      treatInputConfirm: false
    }
  },
  computed: {
    isBtnDisable() {
      return this.goodCate.length !== 3;
    },
    addParamsTitle() {
      if(this.activeName === 'many') {
        return '添加动态参数';
      } else {
        return '添加静态属性';
      }
    },
    paramsLabel() {
      if(this.activeName === 'many') {
        return '动态参数';
      } else {
        return '静态属性';
      }
    },
    editorParamsTitle() {
      if(this.activeName === 'many') {
        return '修改动态参数';
      } else {
        return '修改静态属性';
      }
    }
  },
  created() {
    this.getAllGoodsCateList();
  },
  methods: {
    getAllGoodsCateList() {
      getAllGoodsCateList().then(res => {
          this.goodsCateList = res.data;
      })
    },
    goodCateChange() {
      // 清空非三级分类
      if(this.goodCate.length !== 3) {
        this.goodCate = [];
        this.manyTableData = [];
        this.onlyTableData = [];
        return
      }
      this.getGoodParams();
    },
    changeTabs() {
      // 防止重复点击
      if (this.beforeName !== this.activeName) {
        this.getGoodParams();
      }
      this.beforeName = this.activeName;
    },
    getGoodParams() {
      // 请求参数
      if(this.goodCate.length === 3) {
        getGoodParams(this.goodCate[this.goodCate.length-1], {sel: this.activeName}).then(res => {
          res.data.forEach(item => {
            item.attr_vals = (item.attr_vals.length === 0)? [] : item.attr_vals.split(" ");
            item.inputVisible = false,
            item.inputValue = ''
          })
          if(this.activeName === "many") {
            this.manyTableData = res.data;
          } else {
            this.onlyTableData = res.data;
          }
        })
      }
    },
    closeAddParamsDialog() {
      this.$refs.addParamsForm.resetFields();
      this.addParamsVisible = false;
    },
    sureAddParamsDialog() {
      this.$refs.addParamsForm.validate(valid => {
        if(valid) {
          addGoodParams(this.goodCate[this.goodCate.length-1], {
            attr_name: this.addParamsForm.attr_name,
            attr_sel: this.activeName
          }).then(res => {
            if(res.meta.status === 201) {
              this.$message.success('添加成功');
              this.closeAddParamsDialog();
              this.getGoodParams();
            }
          }) 
        }
      })
    },
    closeEditorParamsDialog() {
      this.$refs.editorParamsForm.resetFields();
      this.editorParamsVisible = false;
    },
    sureEditorParamsDialog() {
      this.$refs.editorParamsForm.validate(valid => {
        if(valid) {
          editorGoodParams(this.goodCate[this.goodCate.length-1], this.readyEditorCateId, {
            attr_name: this.editorParamsForm.attr_name,
            attr_sel: this.activeName
          }).then(res => {
            if(res.meta.status === 200) {
              this.$message.success('编辑成功');
              this.closeEditorParamsDialog();
              this.getGoodParams();
            }           
          })
        }
      })
    },
    clickEditorCate(attrId) {
      searchGoodParams(this.goodCate[this.goodCate.length-1], attrId, {
        attr_sel: this.activeName
      }).then(res => {
        if(res.meta.status === 200) {
          this.editorParamsForm.attr_name = res.data.attr_name;
          this.readyEditorCateId = attrId;
        } 
      })
      this.editorParamsVisible = true;
    },
    clickDeleteCate(attrId) {
      this.$confirm('此操作将永久删除该参数/属性, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGoodParams(this.goodCate[this.goodCate.length-1], attrId).then(res => {
            if(res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getGoodParams();
            }
          })   
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleInputConfirm(scope) {
      if(this.treatInputConfirm) {return} 
      // 防止重复处理
      this.treatInputConfirm = true;
      // 清空空格字符串
      if(scope.row.inputValue.trim().length === 0) {
        scope.row.inputValue = '';
        scope.row.inputVisible = false;
        this.treatInputConfirm = true;
        return
      }
      scope.row.attr_vals.push(scope.row.inputValue);
      this.addEditorGoodParams(scope);
    },
    addEditorGoodParams(scope) {
      addEditorGoodParams(this.goodCate[this.goodCate.length-1], scope.row.attr_id, {
          attr_name: scope.row.attr_name,
          attr_sel: this.activeName,
          attr_vals: scope.row.attr_vals.join(' ')
      }).then(res => {
          if(res.meta.status === 200) {
            this.$message.success('编辑成功');
            scope.row.inputValue = '';
            scope.row.inputVisible = false;
          }
      })
    },
    showInput(scope) {
      this.treatInputConfirm = false;
      scope.row.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    closeElTag(scope, indez) {
      scope.row.attr_vals.splice(indez, 1);
      this.addEditorGoodParams(scope);
    }
  }
}
</script>

<style lang="less" scoped>
#params {
  .el-card {
    margin-top: 14px;
    .good-cate {
      margin: 12px 0 12px 0;
    }
    .good-cate-text {
      margin: 8px 5px 10px 0;
      color: #303133;
      font-size: 14px;
    }
    .el-tag {
      margin-right: 15px;
      font-size: 14px;
    }
    .add-params {
        margin-bottom: 12px;
    }
  }
}
.input-new-tag {
  max-width: 100px;
}

</style>