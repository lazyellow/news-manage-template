<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="角色" width="auto"></el-table-column>
      <el-table-column prop="name" label="数量" width="auto"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { getUserRole, getRoleAll } from "@/api/user";
export default {
  data() {
    return {
      tableData: [],
      roleList: [],
      roleCount: []
    };
  },
  created() {
    let token = getToken();
    getRoleAll(token).then(res => {
      for (let item of res.data.data) {
        this.roleList.push(item.role_name);
      }
      console.log(this.roleList);
    });
    getUserRole().then(res => {
      for (let roleitem of this.roleList) {
        let count = 0;
        for (let item of res.data.data) {
          if (item.Role.rolename === roleitem) {
            count += 1;
          }
        }
        this.roleCount.push(count)
        count = 0
      }
      console.log("--------")
      console.log(this.roleCount)
    });
  }
};
</script>