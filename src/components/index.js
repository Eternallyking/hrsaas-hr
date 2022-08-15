import PageTooles from '@/components/PageTooles'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
const components = [PageTooles, UploadExcel, UploadImg]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
