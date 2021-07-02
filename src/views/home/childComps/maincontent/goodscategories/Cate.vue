<template>
  <div id="categories">
    <crumbs/>
    <el-card class="el-card">
      <el-button type="primary" @click="clickAddCate">添加分类</el-button>
      <!-- 树形表格 -->
      <tree-table :data="GoodsCateList" :columns="columns" :selection-type="false" :expand-type="false"
        show-index index-text="#" border class="tree-table">
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false"
            style="color: lightgreen;"></i>
          <i class="el-icon-error" v-else
            style="color: red;"></i>  
        </template>
        <!-- 排序  -->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag> 
          <el-tag v-else-if="scope.row.cat_level === 1" type="success" size="mini">二级</el-tag> 
          <el-tag v-else type="danger" size="mini">三级</el-tag> 
        </template>  
        <!-- 操作 -->
        <template slot="opt"  slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="clickEditorCate(scope.row.cat_id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="clickDeleteCate(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum" :page-sizes="[3, 5, 10]"
        :page-size="querInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="CateSize">
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateVisible" width="50%" :before-close="closeAddCate">
      <el-form ref="addCateForm" :rules="addCateRules" :model="addCateForm" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" class="el-cascader-box">
          <el-cascader v-model="setParentCate" :options="parentGoodsCateList" :props="parentCateProps"
            @change="handleChange" :clearable="true" class="el-cascader">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddCate">取 消</el-button>
        <el-button type="primary" @click="sureAddCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更改分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="setCateVisible" width="50%" :before-close="closeSetCate">
      <el-form ref="setCateForm" :rules="setCateFormRules" :model="setCateForm" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="setCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSetCate">取 消</el-button>
        <el-button type="primary" @click="sureSetCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Crumbs from 'components/common/Crumbs'

import {getGoodsCateList, getGoodsCateFatherList, addGoodsCate, getGoodsCate, setGoodsCate,
  deleteGoodsCate} from '@/network/home'

export default {
  components: {
    Crumbs
  },
  data() {
    return {
      // 查询参数
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 分类列表
      GoodsCateList: [],
      // 分类数量
      CateSize: 0,
      // 树形表格配置
      columns: [{
        label: '分类名称',
        prop: 'cat_name',
        minWidth: '120px'
      }, {
        label: '是否有效',
        // 模板列
        type: 'template',
        template: 'isok',
        width: '100px'
      }, {
        label: '排序',
        type: 'template',
        template: 'order'
      }, {
        label: '操作',
        minWidth: '140px',
        type: 'template',
        template: 'opt'
      }],
      // 展示添加分类
      addCateVisible: false,
      // 添加分类表单数据
      addCateForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      // 检验规则
      addCateRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 父级分类列表
      parentGoodsCateList: [],
      // 选中项绑定值
      setParentCate: [],
      // 配置选项
      parentCateProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 展示编辑分类
      setCateVisible: false,
      // 预编辑 id
      readyEditorCateId: -1,
      // 编辑分类表单绑定数据
      setCateForm: {
        cat_name: ''
      },
      // 校验规则
      setCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getGoodsCateList();
  },
  methods: {
    getGoodsCateList() {
      getGoodsCateList(this.querInfo).then(res => {
        this.GoodsCateList = res.data.result;
        this.CateSize = res.data.total;
      })
    },
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize;
      this.getGoodsCateList();
    },
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage;
      this.getGoodsCateList();
    },
    clickAddCate() {
      this.getGoodsCateFatherList();
      this.addCateVisible = true;
    },
    getGoodsCateFatherList() {
      getGoodsCateFatherList().then(res => {
        if (res.meta.status === 200){
          this.parentGoodsCateList = res.data;
        }
      })
    },
    handleChange(arr) {
      console.log(arr);
      console.log(this.setParentCate);
      // 分类父ID
      if(arr.length === 0) {
        this.addCateForm.cat_pid = 0;
      } else {
        this.addCateForm.cat_pid = arr[arr.length-1];
      } 
      // 分层等级
      this.addCateForm.cat_level = arr.length;
    },
    sureAddCate() {
      this.$refs.addCateForm.validate(valid => {
        if(valid) {
          addGoodsCate(this.addCateForm).then(res => {
            this.$message.success('添加分类成功');
            this.closeAddCate();
            this.getGoodsCateList();
          })
        }
      })
    },
    closeAddCate() {
      this.addCateVisible = false;
      // 清数据
      this.addCateForm.cat_pid = 0;
      this.addCateForm.cat_level = 0;
      this.addCateForm.cat_name = '';
      // 绑定值
      this.setParentCate = [];
    },
    clickEditorCate(id) {
      getGoodsCate(id).then(res => {
        this.readyEditorCateId = res.data.cat_id;
        this.setCateForm.cat_name = res.data.cat_name;
        this.setCateVisible = true;
      })
    },
    sureSetCate() {
      setGoodsCate(this.readyEditorCateId, this.setCateForm).then(res => {
        if(res.meta.status === 200) {
          this.$message.success('更改分类成功');
          this.closeSetCate();
          this.getGoodsCateList();
        }
      })
    },
    closeSetCate() {
      this.setCateForm.cat_name = '';
      this.readyEditorCateId = -1;
      this.setCateVisible = false;
    },
    clickDeleteCate(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGoodsCate(id).then(res => {
            if(res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.readyDeleteCateId = -1;
              this.getGoodsCateList();
            }
          })
        }).catch(() => {
          this.readyDeleteCateId = -1;
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>

<style lang="less" scoped>
#categories {
  .el-card {
    max-height: calc(100vh - 60px - 74px);
    overflow: auto;
    margin: 12px 0;
    .tree-table {
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }
  .el-cascader {
    width: 100%;
  }
}

</style>