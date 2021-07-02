<template>
  <div id="orders">
    <crumbs/>
    <el-card class="el-card">
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="8">
          <el-input v-model="searchInfo" placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> 
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="ordersData" style="width: 99.9%" border stripe class="el-table">
        <el-table-column type="index" label="#" width="55"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="80"></el-table-column>
        <el-table-column label="是否付款" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay === 0" type="success">已支付</el-tag>
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="80"></el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="180"></el-table-column>
        <el-table-column label="操作" width="140">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="clickEditorForm"></el-button>
            <el-button type="success" icon="el-icon-location-outline" @click="clickProgressInfo" size="mini"></el-button>
          </template>
        </el-table-column>     
      </el-table>
       <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
        :current-page="queryInfo.pagenum" :page-sizes="[3, 5, 10]" :page-size="queryInfo.pagesize" 
        layout="total, sizes, prev, pager, next, jumper" :total="orderTotal"></el-pagination>
    </el-card>
    <!-- 编辑对话框 -->
    <el-dialog title="修改地址" :visible.sync="editorFormVisible" width="50%" :before-close="closeEditorForm">
      <el-form :model="editorData" :rules="editorFormRules" ref="editorFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader v-model="editorData.address1" :options="provinces" clearable
            class="el-cascader" :props="provincesProps"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="editorData.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditorForm">取 消</el-button>
        <el-button type="primary" @click="closeEditorForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流进度 -->
    <el-dialog  title="物流进度" :visible.sync="progressInfoVisible" width="50%">
      <el-timeline :reverse="true">
        <el-timeline-item v-for="(activity, index) in orderProgress" :key="index" 
          :timestamp="activity.timestamp" type="success">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import Crumbs from 'components/common/Crumbs'

import provinces from '@/common/city_data2017_element'
import orderProgress from '@/common/order_progress'
import {getOrdersList} from '@/network/home'
export default {
  components: {
    Crumbs
  },
  data() {
    return {
      searchInfo: '',
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 数据
      ordersData: [],
      orderTotal: 0,
      editorFormVisible: false,
      editorData: {
        address1: [],
        address2: ''
      },
      editorFormRules: {
        address1: [
          { required: true, message: '请输入省市区/县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      // 省份
      provinces,
      provincesProps: {
        expandTrigger: 'hover',
        value: 'value',
        label: 'label',
        children: 'children'
      },
      progressInfoVisible: false,
      // 物流
      orderProgress
    }
  },
  created() {
    this.getOrdersList();
  },
  methods: {
    getOrdersList() {
      getOrdersList(this.queryInfo).then(res => {
        if(res.meta.status === 200) {
          this.$message.success('获取订单列表成功');
          res.data.goods.forEach(item => {
            item.create_time = this.dataFormat(item.create_time)
          })
          this.ordersData = res.data.goods;
          this.orderTotal = res.data.total;
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
      this.getOrdersList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrdersList();
    },
    clickEditorForm() {
      this.editorFormVisible = true;
    },
    closeEditorForm() {
      this.editorFormVisible = false;
      this.editorData.address1 = [];
      this.editorData.address2 = '';
    },
    clickProgressInfo() {
      this.progressInfoVisible = true;
    }
  }
}
</script>

<style lang="less" scoped>
#orders {
  .el-card {
    margin-top: 14px;
    width: 99.9%;
    .el-table {
      margin: 16px 0;
    }
  }
}
.el-cascader {
  width: 100%;
}
</style>