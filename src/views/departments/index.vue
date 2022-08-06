<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading" class="box-card">
        <TreeTools @add="showadddept" :treenode="company" :isroot="true" />
        <el-tree :data="treedata" :props="defaultProps" default-expand-all
          ><template v-slot="{ data }">
            <TreeTools
              @add="showadddept"
              @remove="getDepts"
              @edit="showedit"
              :treenode="data"
            /> </template
        ></el-tree>
      </el-card>
    </div>
    <AddDept
      ref="addDept"
      @addDepts="getDepts"
      :visible.sync="dialogVisible"
      :correntnode="correntnode"
    />
  </div>
</template>

<script>
import TreeTools from './components/TreeTools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
import AddDept from './components/AddDept.vue'
export default {
  data() {
    return {
      treedata: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name'
      },
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      correntnode: {},
      loading: false
    }
  },
  components: {
    TreeTools,
    AddDept
  },

  created() {
    this.getDepts()
  },

  methods: {
    async getDepts() {
      this.loading = true
      const res = await getDeptsApi()
      this.treedata = transListToTree(res.depts, '')
      this.loading = false
    },
    showadddept(val) {
      this.dialogVisible = true
      this.correntnode = val
    },
    showedit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    }
  }
}
</script>

<style scoped lang="scss"></style>
