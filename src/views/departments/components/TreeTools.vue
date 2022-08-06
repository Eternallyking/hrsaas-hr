<template>
  <el-row class="app" type="flex">
    <el-col>{{ treenode.name }}</el-col>
    <el-col :span="5">
      <el-row type="flex">
        <el-col>{{ treenode.manager }}</el-col>
        <el-col>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('add', treenode)"
                >添加子部门</el-dropdown-item
              >
              <template v-if="!isroot">
                <el-dropdown-item>编辑部门</el-dropdown-item>
                <el-dropdown-item @click.native="onremove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptsApi } from '@/api/departments'
export default {
  data() {
    return {}
  },
  props: {
    treenode: {
      type: Object,
      required: true
    },
    isroot: {
      type: Boolean,
      default: false
    }
  },

  created() {},

  methods: {
    async onremove() {
      try {
        await this.$confirm('您是否确定要删除该部门吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'
        })
        await delDeptsApi(this.treenode.id)
        this.$message.success('删除成功')
        this.$emit('remove')
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="scss">
.app {
  width: 100%;
}
</style>
