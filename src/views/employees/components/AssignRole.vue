<template>
  <el-dialog
    @open="onopen"
    @close="onclose"
    title="分配角色"
    :visible="visible"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    EmployessId: {
      type: String,
      required: true
    }
  },

  created() {},

  methods: {
    onclose() {
      this.$emit('update:visible', false)
    },
    async getRoles() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    onopen() {
      this.getRoles()
      this.getUserDetail()
    },
    async getUserDetail() {
      const { roleIds } = await getUserDetail(this.EmployessId)
      this.checkList = roleIds
    },
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({ id: this.EmployessId, roleIds: this.checkList })
      this.$message.success('分配成功')
      this.onclose()
    }
  }
}
</script>

<style scoped></style>
