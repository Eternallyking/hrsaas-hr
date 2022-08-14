<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTooles>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="importExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="Add()"
            >新增员工</el-button
          >
        </template>
      </PageTooles>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeeslist">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatter"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="ondel(row.id)"
                >删除</el-button
              >
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
    <Add @addgetlist="getemployeeslist" :visible.sync="addvisible" />
  </div>
</template>
<script>
import { getemployeeslistapi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import Add from './components/Add'
import employess from '@/constant/employees'
const { exportMapKeyPath, hireType } = employess
export default {
  name: 'Employees',
  data() {
    return {
      employeeslist: [],
      total: 0,
      pages: {
        page: 1,
        size: 5
      },
      addvisible: false
    }
  },
  components: {
    Add
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
    },
    formatter(row, column, cellValue, index) {
      const finditem = employees.hireType.find((e) => e.id === cellValue)
      return finditem ? finditem.value : '未知'
    },
    async ondel(id) {
      await this.$confirm('您确定删除该员工吗？')
      await delEmployee(id)
      this.$message.success('删除成功')
    },
    Add() {
      this.addvisible = true
    },
    async importExcel() {
      const { rows } = await getemployeeslistapi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportMapKeyPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const finditem = hireType.find((heir) => {
              return heir.id === item[exportMapKeyPath[h]]
            })
            return finditem ? finditem.value : '未知'
          } else {
            return item[exportMapKeyPath[h]]
          }
        })
      })
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    }
  }
}
</script>

<style scoped lang="acss"></style>
