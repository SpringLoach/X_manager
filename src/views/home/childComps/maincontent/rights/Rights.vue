<template>
  <div class="rights">
    <crumbs/>
    <blank-box>
      <data-list>
        <table slot="option" class="list-tabel">
          <tr>
            <th>#</th>
            <th>权限名称</th>
            <th>路径</th>
            <th>权限等级</th>
          </tr>
          <tr v-for="(item, index) in RightsList" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.authName}}</td>
            <td>{{item.path}}</td>
            <td class="rights-level">
              <span class="level1" v-if="item.level == 0">一级权限</span>
              <span class="level2" v-if="item.level == 1">二级权限</span>
              <span class="level3" v-if="item.level == 2">三级权限</span>
            </td>
          </tr>
        </table>
      </data-list> 
    </blank-box>
  </div>
</template>

<script>

import BlankBox from 'components/content/BlankBox'
import DataList from 'components/content/datalist/DataList'
import Crumbs from 'components/common/Crumbs'

import {getRightsList} from '@/network/home'

export default {
  components: {
    Crumbs,
    BlankBox,
    DataList  
  },
  data() {
    return {
      RightsList: []
    }
  },
  created() {
    this.getRightsList();
  },
  methods: {
    getRightsList() {
      getRightsList().then(res => {
        this.RightsList = res.data;
        this.$toast.show('请求数据成功');
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rights {
  .list-tabel {
    th, td {
      padding: 18px;
      border: 1px solid rgb(236, 231, 231);
    }
    .rights-level {
      width: 120px;
      span {
        padding: 5px 10px; 
        border-radius: 4px;
      }
      .level1 {
        background-color: #ecf5ff;
        border: 1px solid #e9ecff;
        color: #409eff;
      }
      .level2 {
        background-color: #f0f9eb;
        border: 1px solid #e1f3d8;
        color: #67c23a;
      }
      .level3 {
        background-color: #fdf6ec;
        border: 1px solid #faecd8;
        color: #e6a23c;
      }
    }
  }
}
</style>