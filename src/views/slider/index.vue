<template>
  <div class="content">
    <el-button class="add" icon="el-icon-plus" @click="dialogAddVisible = true">添加轮播图</el-button>
    <!-- 编辑弹窗 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogAddVisible"
      :close-on-click-modal="false"
      @close="closeAddDialog()"
    >
      <el-form :model="add_form">
        <el-form-item label="对应新闻ID">
          <el-input v-model="add_form.news_id"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="clear"
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
        <el-button @click="dialogCancelCommit()">取 消</el-button>
        <el-button type="primary" @click="dialogAddCommit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
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
          <el-table-column label="轮播预览图">
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
              <el-dialog title="修改" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
                <el-form :model="edit_form">
                  <el-form-item label="对应新闻ID">
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
import { getSlider, addSlider, updateSlider, deleteSlider } from "@/api/slider";
import { uploadImg } from "@/api/newslist";

export default {
  data() {
    return {
      sliderList: [],
      // imgList: [],
      add_form: {
        news_id: "",
        img: ""
      },
      edit_form: {
        sid: "",
        news_id: "",
        img: "",
        fileImg: {}
      },
      fileImg: {},
      dialogAddVisible: false,
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
    // 上传图片
    async submitUpload(file) {
      let param = new FormData();
      param.append("blobinfo", file);
      const result = await uploadImg(param);
      return result;
    },

    // 选取封面图片
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

    //添加弹窗-取消按钮
    async dialogCancelCommit() {
      (this.add_form.news_id = ""),
        (this.add_form.img = ""),
        (this.fileImg = ""),
        this.$refs.clear.clearFiles();
      this.dialogAddVisible = false;
    },

    //添加弹窗-右上关闭按钮
    closeAddDialog() {
      (this.add_form.news_id = ""),
        (this.add_form.img = ""),
        (this.fileImg = ""),
        this.$refs.clear.clearFiles();
    },

    //添加弹窗
    async dialogAddCommit() {
      if (this.fileImg === "" || this.add_form.news_id === "") {
        if (this.add_form.news_id === "") {
          this.$message({
            message: "请添加轮播图对应的新闻ID",
            type: "warning"
          });
        } else if (this.fileImg === "") {
          this.$message({
            message: "请添加轮播图",
            type: "warning"
          });
        }
      } else {
        const imgUrl = await this.submitUpload(this.fileImg);
        if (imgUrl.data.code === 200) {
          this.add_form.img = imgUrl.data.success;
        } else {
          console.log(imgUrl);
        }
        const result = await addSlider(this.add_form);
        (this.add_form.news_id = ""),
          (this.add_form.img = ""),
          (this.fileImg = ""),
          this.$refs.clear.clearFiles();
        this.dialogAddVisible = false;
        if (result.data.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          getSlider().then(res => {
            if (res.data.code === 200) {
              // 初始化表格的数据
              this.sliderList = res.data.data;
            } else {
              console.log(res);
            }
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "warning"
          });
          console.log(result);
        }
      }
    },

    // 编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.edit_form.sid = row.sid;
      this.edit_form.news_id = row.news_id;
      this.edit_form.img = row.img;
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

    //提交修改
    async dialogEditCommit() {
      if (this.edit_form.news_id === "") {
        this.$message({
          message: "请输入对应新闻ID",
          type: "warning"
        });
      } else {
        const imgUrl = await this.submitUpload(this.fileImg);
        if (imgUrl.data.code === 200) {
          this.edit_form.img = imgUrl.data.success;
        } else {
          console.log(imgUrl);
        }
        this.$delete(this.edit_form, "fileImg");
        const result = await updateSlider(this.edit_form);
        this.dialogFormVisible = false;
        if (result.data.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          getSlider().then(res => {
            if (res.data.code === 200) {
              // 初始化表格的数据
              this.sliderList = res.data.data;
            } else {
              console.log(res);
            }
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "warning"
          });
          console.log(result);
        }
      }
    },

    //删除
    async handleDelete(index, row) {
      const result = await deleteSlider(row.sid);
      if (result.data.code === 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        getSlider().then(res => {
          if (res.data.code === 200) {
            // 初始化表格的数据
            this.sliderList = res.data.data;
          } else {
            console.log(res);
          }
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "warning"
        });
        console.log(result);
      }
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 100px;
}
.add {
  margin-top: 20px;
  margin-left: 35px;
}
.table {
  margin: 20px 0px;
}
.imgItem {
  position: relative;
}
.imgUpload {
  position: absolute;
  top: 0;
  left: 200px;
}
</style>
