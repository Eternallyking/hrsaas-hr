<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel :beforeUpload="beforeUploadExcel" :onSuccess="onSuccess" />
    </div>
  </div>
</template>

<script>
import employess from '@/constant/employees'
const { importMapKeyPath } = employess
import { importEmployee } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    beforeUploadExcel({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请上传xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const arr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployee(arr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss"></style>
