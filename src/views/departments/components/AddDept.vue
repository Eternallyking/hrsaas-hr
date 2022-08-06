<template>
  <el-dialog @close="onclose" :title="Title" :visible="visible" width="50%">
    <el-form
      ref="form"
      label-width="120px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          placeholder="请选择负责人"
          style="width: 100%"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="1-300个字符"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="onsave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptsApi,
  addDeptsByIdApi,
  editDeptsApi
} from '@/api/departments'
import { getemployeesapi } from '@/api/employees'
export default {
  data() {
    const checkdeptname = async (rule, value, callback) => {
      let isrepeat
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        isrepeat = depts
          .filter(
            (e) => e.pid === this.formData.id && e.id !== this.formData.id
          )
          .some((e) => e.name === value)
      } else {
        if (!this.correntnode.children) return callback()
        isrepeat = this.correntnode.children.some((e) => e.name === value)
      }
      isrepeat
        ? callback(new Error('同级部门下已经有财务核算部这个部门了'))
        : callback()
    }
    const checkdeptcode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let isrepeat
      if (this.formData.id) {
        isrepeat = depts
          .filter((e) => e.id !== this.formData.id)
          .some((e) => e.code === value)
      } else {
        isrepeat = depts.some((e) => e.code === value)
      }
      isrepeat
        ? callback(new Error('已经有' + value + '这个编码了'))
        : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      formRules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          {
            validator: checkdeptname,
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur'
          },
          {
            validator: checkdeptcode,
            trigger: 'blur'
          }
        ],
        manager: [
          {
            required: true,
            message: '部门负责人不能为空',
            trigger: 'change'
          }
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符'
          }
        ]
      },
      employees: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    correntnode: {
      type: Object,
      required: true
    }
  },
  computed: {
    Title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },

  created() {
    this.getemployees()
  },

  methods: {
    async getemployees() {
      const res = await getemployeesapi()
      this.employees = res
    },
    onclose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async onsave() {
      try {
        if (this.formData.id) {
          await editDeptsApi(this.formData)
          this.$message.success('编辑部门成功')
          this.onclose()
          this.$emit('addDepts')
        } else {
          await this.$refs.form.validate()
          this.formData.pid = this.correntnode.id
          await addDeptsApi(this.formData)
          this.$message.success('添加部门成功')
          this.onclose()
          this.$emit('addDepts')
        }
      } catch (error) {
        this.$message.error('操作部门失败')
      }
    },
    async getDeptById(id) {
      this.formData = await addDeptsByIdApi(id)
    }
  }
}
</script>

<style scoped></style>
