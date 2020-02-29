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
        <el-select v-model="form.category" placeholder="请选择新闻类型">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
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
        <el-switch v-model="form.hotnews" />
      </el-form-item>
      <!-- 富文本编辑 -->
      <el-form-item label="新闻正文">
        <div class="components-container">
          <tinymce v-model="form.news_content" :height="300" />
          <div class="editor-content" v-html="form.news_content" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      CategoryList: [],
      form: {
        news_title: "",
        news_subtitle: "",
        category: "",
        news_reporter: "",
        news_editor: "",
        news_reviewer: "",
        hotnews: false,
        news_content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.news_title.length == 0) {
        this.$alert("给你的新闻起个标题吧");
      } else {
        this.$message("提交成功");
        console.log(this.form);
      }
    },
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
  // created: function(){
  //   this.$http.get('http://47.101.150.127:3030/category/getCategorys')
  //       .then(res => {
  //           this.CategoryList = res.data.data;
  //           console.log("请求新闻分类接口测试："+res);
  //       }).catch(function(error){
  //           console.log(error)
  //       });
  // }
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

