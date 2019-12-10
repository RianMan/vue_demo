<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-cascader
          style="width:100%"
          v-model="areavalue"
          placeholder="选择区域"
          :options="area"
          :props="{ value:'regionName', label:'regionName', children:'nodes',checkStrictly: true }"
          clearable
        />
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button @click="search" type="primary"> 搜索 </el-button>
      </el-col>
      <el-col :span="12">
        <el-button @click="reset"> 重置 </el-button>
      </el-col>
    </el-row>
    <br />
    <div v-for="item in list" :key="item.id">
      <div> 姓名： {{ item.name }} </div>
      <div> 经营方向： {{ item.operateDirection.join(',') }} </div>
      <div> 客户类型： {{ item.type }} </div>
      <div>  重要程度：<el-rate disabled class="rate" v-model="item.importance "></el-rate> </div>
      <el-link type="primary" @click="goDetail(item)">查看详情</el-link>
      <el-divider></el-divider>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    />
  </div>
</template>

<script>
import { req }  from '../request';

export default {
  name: 'home',
  data(){
    return {
      total: 0,
      pageSize: 10,
      list:[],
      queryData:{},
      area:[],
      areavalue:[],
    }
  },
  async beforeMount(){
    this.handleGetlist();
    let { data } = await req('GET','/api/v1/region/tree');
    this.area = [data[0]];
  },
  methods:{
    async handleGetlist(params={}){
      let { data } = await req('GET','/api/v1/customer',null,this.queryData);
      if(data){
        this.total = data.allRecord;
        this.list = data.list;
      }
    },
    goDetail(r){
      this.$router.push('/detail/'+r.id)
    },
    changePage(e){
      this.queryData = {
        ...this.queryData,
        pageNum:e,
      }
      this.handleGetlist();
    },
    search(){
      console.log(this.areavalue)
      const [ country,province,city,region] = this.areavalue;
      this.queryData = {
        ...this.queryData,
        country,
        province,
        city,
        region,
        pageNum:1,
      }
      this.handleGetlist();
    },
    reset(){
      this.areavalue = [];
      this.queryData = {
        pageNum:1,
      }
      this.handleGetlist();
    }
  },
  components: {
  },
};
</script>
<style>
  .rate{
    display: inline-block;
  }
</style>
