<template>
  <div class="app-container">
    <el-form label-width="100px">
      <el-form-item label="新闻标题">
        <el-col :span="12">
          <el-input v-model="form.news_title" />
        </el-col>
      </el-form-item>
      <el-form-item label="新闻副标题">
        <el-col :span="12">
          <el-input v-model="form.news_subtitle" type="textarea" />
        </el-col>
      </el-form-item>
      <el-form-item label="新闻分类">
        <el-select v-model="form.category_id" placeholder="请选择新闻类型">
          <el-option
            v-for="item in categoryList"
            :label="item.category_name"
            :value="item.category_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="新闻封面">
        <el-image style="width: 150px; height: 150px" :src="form.news_source" fit="cover"></el-image>
        <el-upload
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
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.news_time"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <!-- 新闻人员信息 -->
      <el-form-item label="新闻记者">
        <el-col :span="3">
          <el-input v-model="form.news_reporter" />
        </el-col>
      </el-form-item>
      <el-form-item label="编辑人员">
        <el-col :span="3">
          <el-input v-model="form.news_editor" />
        </el-col>
      </el-form-item>
      <el-form-item label="审核人员">
        <el-col :span="3">
          <el-input v-model="form.news_reviewer" />
        </el-col>
      </el-form-item>
      <!-- 热点新闻 -->
      <el-form-item label="设置热点新闻">
        <el-switch v-model="setHot" />
      </el-form-item>
      <!-- 富文本编辑 -->
      <el-form-item label="新闻正文">
        <div class="components-container">
          <tinymce v-model="form.news_content" :height="500" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCheck">预览</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- 查看弹窗 -->
    <el-dialog :visible.sync="dialogNewsVisible">
      <div v-html="form.news_content" />
    </el-dialog>
  </div>
</template>


<script>
import Tinymce from "@/components/Tinymce";
import { getCategory } from "@/api/category";
import { updateNews, uploadImg } from "@/api/newslist";

export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      categoryList: [],
      form: {
        news_id: "",
        news_title: "",
        news_subtitle: "",
        category_id: "",
        news_source: "",
        news_reporter: "",
        news_editor: "",
        news_reviewer: "",
        hot_status: "",
        news_time: "",
        news_content: ""
      },
      initHot: "",
      setHot: "",
      fileImg: {},
      dialogNewsVisible: false
    };
  },
  created: function() {
    // 编辑内容初始化
    this.form = this.$route.params.newsMessage;
    this.initHot = this.$route.params.newsMessage.hot_status;
    if (this.form.hot_status === 2) {
      this.setHot = true;
    } else {
      this.setHot = false;
    }

    //新闻分类选项初始化
    getCategory().then(res => {
      this.categoryList = res.data.data;
    });
  },
  methods: {
    // 修改封面图片
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

    // 预览
    onCheck() {
      this.dialogNewsVisible = true;
    },

    // 提交
    async onSubmit() {
      console.log(this.fileImg.length);
      const imgUrl = await this.submitUpload(this.fileImg);
      if (imgUrl.data.code === 200) {
        this.form.news_source = imgUrl.data.success;
      }
      if (this.setHot === true) {
        this.form.hot_status = 2;
      } else if (this.setHot === false && this.initHot === 2) {
        this.form.hot_status = 0;
      }
      const result = await updateNews(this.form);
      if (result.data.code === 200) {
        this.$message({
          message: "修改成功！",
          type: "success"
        });
        this.$router.push({
          name: "news_list"
        });
      } else {
        this.$message({
          message: "修改失败！",
          type: "warning"
        });
        console.log(result);
      }
    },

    // 清空
    onClear() {
      (this.form.news_title = ""),
        (this.form.news_subtitle = ""),
        (this.form.category = ""),
        (this.form.news_reporter = ""),
        (this.form.news_editor = ""),
        (this.form.news_reviewer = ""),
        (this.form.hotnews = false),
        (this.form.news_content = "");
      this.$message({
        message: "已清空!",
        type: "success"
      });
      console.log(this.form);
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.editor-content {
  margin-top: 20px;
}
</style>

