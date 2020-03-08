<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="角色" width="auto"></el-table-column>
      <el-table-column prop="name" label="数量" width="auto"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getUserRole } from "@/api/user";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created(){
      getUserRole().then(res =>{
          console.log(res)
      })
  }
};
</script>