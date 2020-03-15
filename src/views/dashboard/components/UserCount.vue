<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="角色" width="auto"></el-table-column>
      <el-table-column prop="value" label="数量" width="auto"></el-table-column>
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
      roleCount: [],
      count: 0
    };
  },
  created() {
    let token = getToken();
    getRoleAll(token).then(res => {
      for (let rolename of res.data.data) {
        getUserRole().then(res => {
          for (let item of res.data.data.rows) {
            if (item.Role.role_name === rolename.role_name) {
              this.count += 1;
            }
          }
          this.tableData.push({
            name: rolename.role_name,
            value: this.count
          });
          this.count = 0;
        });
      }
    });
  },
  methods: {
    tableInit(rname, rcount) {
      console.log(rname);
      console.log(rcount);

      for (let item of rname) {
        this.tableData.push({
          name: rname[item],
          value: rcount[item]
        });
      }
    }
  }
};
</script>