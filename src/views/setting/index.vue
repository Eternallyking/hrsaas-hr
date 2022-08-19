<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first"
          ><el-button type="primary" @click="adddialogVisible = true"
            >新增角色</el-button
          >
          <el-table
            border
            :data="tableData"
            style="width: 100%; margin-top: 30px"
          >
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="角色"
              width="240"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="description"
              label="描述"
              width="450"
            >
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template>
                <el-button size="small" type="success" @click="setrigtsfn"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-size="pagesize"
            layout="sizes,prev, pager, next"
            :page-sizes="[2, 3, 5, 10]"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second"
          ><el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            :closable="false"
            show-icon
          >
          </el-alert>
          <el-form ref="form" label-width="80px" style="margin: 50px 0 0 40px">
            <el-form-item label="公司名称">
              <el-input
                v-model="CompanyInformation.name"
                disabled
                style="width: 360px"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="CompanyInformation.companyAddress"
                disabled
                style="width: 360px"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input
                v-model="CompanyInformation.mailbox"
                disabled
                style="width: 360px"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                v-model="CompanyInformation.remarks"
                disabled
                style="width: 360px"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      @close="dialogclose"
      title="提示"
      :visible.sync="adddialogVisible"
      width="30%"
    >
      <el-form
        ref="form"
        :model="addRoleForm"
        :rules="addRoleFormrules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onclose">取 消</el-button>
        <el-button type="primary" @click="onaddrole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setrigtsVisible"
      width="50%"
    >
      <el-tree
        :data="permissions"
        :props="{ label: 'name' }"
        default-expand-all
        node-key="id"
        show-checkbox
        :default-checked-keys="defaultCheckedKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setrigtsVisible = false">取 消</el-button>
        <el-button type="primary" @click="setrigtsVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi } from '@/api/role'
import { getcompanyApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 3,
      page: 1,
      adddialogVisible: false,
      addRoleForm: {
        name: '',
        description: ''
      },
      addRoleFormrules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      CompanyInformation: {},
      setrigtsVisible: false,
      permissions: [],
      defaultCheckedKeys: ['1', '1063315016368918528'] 
    }
  },

  created() {
    this.getRoles()
    this.getcompany()
    this.getPermissions()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    onclose() {
      this.adddialogVisible = false
    },
    async onaddrole() {
      await this.$refs.form.validate()
      await addRolesApi(this.addRoleForm)
      this.$message.success('添加角色成功')
      this.adddialogVisible = false
      this.getRoles()
    },
    dialogclose() {
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },
    async getcompany() {
      this.CompanyInformation = await getcompanyApi(
        this.$store.state.user.userInfo.companyId
      )
    },
    setrigtsfn() {
      this.setrigtsVisible = true
    },
    async getPermissions() {
      const res = await getPermissionList()
      const treePermission = transListToTree(res, '0')
      this.permissions = treePermission
    }
  }
}
</script>

<style scoped lang="scss"></style>
