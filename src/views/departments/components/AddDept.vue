<template>
  <el-dialog @close="onclose" title="新增部门" :visible="visible" width="50%">
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
import { getDeptsApi, addDeptsApi } from '@/api/departments'
import { getemployeesapi } from '@/api/employees'
export default {
  data() {
    const checkdeptname = (rule, value, callback) => {
      if (!this.correntnode.children) return callback()
      const isrepeat = this.correntnode.children.some((e) => e.name === value)
      isrepeat
        ? callback(new Error('同级部门下已经有财务核算部这个部门了'))
        : callback()
    }
    const checkdeptcode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      const isrepeat = depts.some((e) => e.code === value)
      isrepeat
        ? callback(new Error('已经有' + value + '这个编码了'))
        : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
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
    },
    async onsave() {
      await this.$refs.form.validate()
      this.formData.pid = this.correntnode.id
      try {
        await addDeptsApi(this.formData)
        this.$message.success('添加成功')
        this.$emit('addDepts')
        this.onclose()
      } catch (error) {
        this.$message.error('添加失败')
      }
    }
  }
}
</script>

<style scoped></style>
