import Vue from 'vue'
import Cloudinary, { CldImage, CldTransformation } from 'cloudinary-vue'

Vue.use(Cloudinary, {
  configuration: { cloudName: 'dgodjz1pn' },
  components: [CldImage, CldTransformation]
})
