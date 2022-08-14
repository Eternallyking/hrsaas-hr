import PageTooles from '@/components/PageTooles'
import UploadExcel from '@/components/UploadExcel'
const components = [PageTooles, UploadExcel]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
