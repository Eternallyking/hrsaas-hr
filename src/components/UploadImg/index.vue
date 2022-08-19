<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :file-list="fileList"
      :http-request="onrequest"
      list-type="picture-card"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.lenght ? 'hide' : ''"
      class="overflow"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewimgdialog">
      <img :src="imgurl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
//id:AKIDrgOtAOfnlU1LQGqAI3dHo9PXUEk281jG
//key:ZxBCyVmodDZgXBZidIiusb5KK5btxnOp
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDrgOtAOfnlU1LQGqAI3dHo9PXUEk281jG',
  SecretKey: 'ZxBCyVmodDZgXBZidIiusb5KK5btxnOp'
})
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      previewimgdialog: false,
      imgurl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onrequest({ file }) {
      this.loading = true

      cos.putObject(
        {
          Bucket: 'hmhr-31-king-1313341657' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          //   console.log(err || data)
          if (err || data.statusCode !== 200) {
            return this.$message.error('亲，上传失败，请重试')
          }
          this.$emit('onSuccess', { url: 'https://' + data.Location })
          this.loading = false
        }
      )
    },
    onChange(file, filelist) {
      this.fileList = filelist
    },
    onRemove(file, filelist) {
      this.fileList = filelist
    },
    onPreview(file) {
      this.imgurl = file.url
      this.previewimgdialog = true
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/png', 'image/gif', 'image/mp4']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      const maxsize = 2 * 1024 * 1024
      if (file.size > maxsize) {
        this.$message.error('选择的图片不能超出2mb')
        return false
      }
    }
  }
}
</script>

<style scoped>
.hide .el-upload--picture-card {
  display: none;
}
.overflow {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
