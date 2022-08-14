<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onsave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="detail" label="个人详情"><UserInfo /></el-tab-pane>
          <el-tab-pane name="info" label="岗位信息" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail, saveUserDetailById } from '@/api/user'
import UserInfo from './user-info.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      formData: {},
      activeName: Cookies.get('activeName') || 'account'
    }
  },
  components: { UserInfo },

  created() {
    this.getUserDetail()
  },

  methods: {
    async getUserDetail() {
      this.formData = await getUserDetail(this.$route.params.id)
    },
    async onsave() {
      await saveUserDetailById(this.formData)
      this.$message.success('更新成功')
    },
    handleClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style scoped></style>
