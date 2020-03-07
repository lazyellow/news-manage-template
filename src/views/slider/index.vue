<template>
  <div>
    <el-row class="table" type="flex" justify="center">
      <el-col :span="23">
        <el-table
          :data="sliderList"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
        >
          <el-table-column label="轮播图ID" prop="sid" width="150"></el-table-column>
          <el-table-column label="对应新闻ID" prop="news_id" width="150"></el-table-column>
          <el-table-column label="轮播预览图" :preview-src-list="img">
            <template slot-scope="scope">
              <el-popover placement="right" title trigger="hover">
                <el-image
                  slot="reference"
                  :src="scope.row.img"
                  :alt="scope.row.img"
                  style="max-width: 400px;max-height: 100px"
                />
                <el-image style="width: 500px; height: auto" :src="scope.row.img" fit="cover"></el-image>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="图片地址" prop="img" width="500px"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <!-- 编辑弹窗 -->
              <el-dialog title="修改" :visible.sync="dialogFormVisible">
                <el-form :model="edit_form">
                  <el-form-item label="对应新闻ID" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.news_id"></el-input>
                  </el-form-item>
                  <el-form-item class="imgItem" label="图片">
                    <el-image style="width: 150px; height: 150px" :src="edit_form.img" fit="cover"></el-image>
                    <el-upload
                      class="imgUpload"
                      action
                      accept="image/jpeg, image/gif, image/png"
                      list-type="picture-card"
                      :on-change="onUploadChange"
                      :auto-upload="false"
                      :show-file-list="true"
                      :limit="1"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogEditCommit()">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { getSlider } from "@/api/slider";
import { uploadImg } from "@/api/newslist";

export default {
  data() {
    return {
      sliderList: [],
      imgList: [],
      edit_form: {
        sid: "",
        news_id: "",
        img: "",
        fileImg: {}
      },
      dialogFormVisible: false
    };
  },
  created: function() {
    getSlider().then(res => {
      if (res.data.code === 200) {
        // 初始化表格的数据
        this.sliderList = res.data.data;
      } else {
        console.log(res);
      }
    });
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.edit_form.sid = row.sid;
      this.edit_form.news_id = row.news_id;
      this.edit_form.img = row.img;
    },

    //删除
    handleDelete(index, row){
      console.log(row.sid)
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },

    //修改封面图
    onUploadChange(file) {
      this.fileImg = file.raw;
      const isIMAGE =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/gif";
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
        return false;
      }
    },

    // 上传图片
    async submitUpload(file) {
      let param = new FormData();
      param.append("blobinfo", file);
      const result = await uploadImg(param);
      return result;
    },

    //提交修改
    async dialogEditCommit() {
      const imgUrl = await this.submitUpload(this.fileImg);
      if (imgUrl.data.code === 200) {
        this.edit_form.img = imgUrl.data.success;
      } else {
        console.log(imgUrl);
      }
      this.$delete(this.edit_form,"fileImg")
      console.log("修改封面图后的数据")
      console.log(this.edit_form)
    }
  }
};
</script>

<style lang="scss" scoped>
.imgItem{
  position: relative;
}
.imgUpload{
  position: absolute;
  top: 0;
  left: 200px;
}
</style>
