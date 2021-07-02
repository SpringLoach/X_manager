<template>
  <div id="goods">
    <crumbs/>
    <el-card class="el-card">
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" 
            class="input-with-select" clearable @clear="clearSearch" @keyup.native.enter="clickSearch">
            <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
           <el-button type="primary" @click="addGood">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="goodsList" style="width: 99.9%" border stripe class="el-table">
        <el-table-column type="index" label="#" width="50px"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）" width="95px"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="70px"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="160px"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="clickEditorGoods(scope)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="clickDeleteGoods(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[5, 8, 10]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="goodsTotal">
      </el-pagination>
    </el-card>
    <!-- 编辑属性 -->
    <el-dialog title="编辑商品" :visible.sync="editorGoodsVisible" width="50%" :before-close="closeEditorForm">
      <!-- 表单 -->
      <el-form ref="editorForm" :model="editorForm" :rules="editorFormRules" label-width="80px">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editorForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="editorForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="editorForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="editorForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <!-- 结尾 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditorForm">取 消</el-button>
        <el-button type="primary" @click="sureEditorForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Crumbs from 'components/common/Crumbs'

import {getGoodsList, deleteGoodsList, getGoods, editorGoods} from '@/network/home'
export default {
  components: {
    Crumbs
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 商品列表
      goodsList: [],
      // 商品总数
      goodsTotal: 0,
      editorGoodsVisible: false,
      editorForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0
      },
      editorFormRules: {
        goods_name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '商品价格不能为空', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空', trigger: 'blur' }
        ],
      },
      readyEditorGoodsId: -1
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      getGoodsList(this.queryInfo).then(res => {
        if(res.meta.status === 200) {
          this.$message.success('获取商品信息成功');
          res.data.goods.forEach(item => {
            item.add_time = this.dataFormat(item.add_time);
          })
          this.goodsList = res.data.goods;
          this.goodsTotal = res.data.total; 
        }
      })
    },
    dataFormat(originVal) {
      const dt = new Date(originVal*1000)
  
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + '').padStart(2, '0');
      const d = (dt.getDate() + '').padStart(2, '0');
      
      const hh = (dt.getHours() + '').padStart(2, '0');
      const mm = (dt.getMinutes() + '').padStart(2, '0');
      const ss = (dt.getSeconds() + '').padStart(2, '0');

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newNum) {
      this.queryInfo.pagenum = newNum;
      this.getGoodsList();
    },
    clickSearch() {
      this.queryInfo.pagenum = 1;
      this.getGoodsList();
    },
    clearSearch() {
      this.queryInfo.pagenum = 1;
      this.queryInfo.query = '';
      this.getGoodsList();
    },
    clickDeleteGoods(id) {
      this.$confirm('此操作将永久删除该商品信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodsList(id).then(res => {
          if(res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getGoodsList();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    clickEditorGoods(scope) {
      this.readyEditorGoodsId = scope.row.goods_id;
      getGoods(scope.row.goods_id).then(res => {
        this.editorForm.goods_name = res.data.goods_name;
        this.editorForm.goods_price = res.data.goods_price;
        this.editorForm.goods_number = res.data.goods_number;
        this.editorForm.goods_weight = res.data.goods_weight;
      })
      this.editorGoodsVisible = true;
    },
    closeEditorForm() {
      this.editorForm.goods_name = '';
      this.editorForm.goods_price = 0;
      this.editorForm.goods_number = 0;
      this.editorForm.goods_weight = 0;
      this.editorGoodsVisible = false;
    },
    sureEditorForm() {
      editorGoods(this.readyEditorGoodsId, this.editorForm).then(res => {
        if(res.meta.status === 400) {
          this.$message.error('系统故障, 无法修改商品信息');
        }
      })
    },
    addGood() {
      this.$router.push('/home/goods/add');
    }
  }
}
</script>

<style lang="less" scoped>
#goods {
  .el-card {
    margin-top: 14px;
    width: 99.9%;
    .el-table {
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }
}
</style>