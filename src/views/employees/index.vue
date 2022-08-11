<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTooles>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTooles>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeeslist">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable="" prop="enableState" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            :page-size="pages.size"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getemployeeslistapi } from '@/api/employees'
export default {
  name: 'Employees',
  data() {
    return {
      employeeslist: [],
      total: 0,
      pages: {
        page: 1,
        size: 5
      }
    }
  },

  created() {
    this.getemployeeslist()
  },

  methods: {
    async getemployeeslist() {
      const { rows, total } = await getemployeeslistapi(this.pages)
      this.employeeslist = rows
      this.total = total
    },
    handleCurrentChange(val) {
      this.pages.page = val
      this.getemployeeslist()
    }
  }
}
</script>

<style scoped lang="acss"></style>
