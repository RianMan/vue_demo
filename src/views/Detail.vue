<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col class="key" :span="6"><el-button @click="back" type="text"> 返回列表 </el-button></el-col>
    </el-row> 
    <br />
    <el-row :gutter="20">
      <el-col class="key" :span="6">名称：</el-col>
      <el-col class="value" :span="18">{{customer.officialName}}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col  class="key" :span="6">地址：</el-col>
      <el-col  class="value"  :span="18">{{customer.province}}，{{customer.city}}，{{customer.region}}，{{customer.address}}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col  class="key" :span="7">预计价值：</el-col>
      <el-col  class="value"  :span="17"> {{customer.customerValues}} </el-col>
    </el-row>
    <el-divider content-position="center">常用联系人</el-divider>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item,index) in contact" :key="item.id" :title='`${index+1}. ${item.name}`' :name="index">
        <el-row :gutter="20">
          <el-col  :span="7">职位：</el-col>
          <el-col  class="value"  :span="17"> {{item.jobTitleValue}} </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col  :span="7">微信：</el-col>
          <el-col  class="value"  :span="17"> {{item.chatId || '无'}} </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">电话号码：</el-col>
          <el-col  class="value"  :span="17"> {{item.telephone.join(',')}} </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { req }  from '../request';

export default {
  name: 'home',
  data(){
    return {
      customer:{},
      contact:[],
      activeName: 1,
    }
  },
  async beforeMount(){
    const { id } = this.$route.params;
    let { data } = await req('GET',`/api/v1/customer/${id}`);
    let { data:contact } = await req('GET',`/api/v1/customer/${id}/contact`);
    this.customer = data.customer;
    console.log(contact,'contact')
    this.contact = contact;
  },
  methods:{
    back(){
      this.$router.push({path:"/"})
    },
  },
  components: {
  },
};
</script>
<style>
  .key{
    color:#909399;
  }
  .value{
    color: #303133;
  }
</style>
