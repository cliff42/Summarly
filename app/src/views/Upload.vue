<template>
  <div class="upload">
    <h1>Upload page</h1>
    <div class="file-uploader">
   <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="text">
        <label>Upload File</label><br/>
        <label class="file-input">
          <input
            type="file"
            ref="file"
            @change="onSelect"
          />
          Custom Upload
        </label>
      </div>
      <div>
        <button class="submit-button">Submit</button>
      </div>
      <div class="message">
        <h5>{{message}}</h5>
      </div>
   </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import FileUploader from '@/components/FileUploader.vue';
export default {
  name: 'FileUpload',
  components: {
    FileUploader
  },
  data() {
    return {
      file:"",
      message:""
    }
  },
  methods: {
    onSelect(){
      const allowedTypes = ["application/pdf"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if(!allowedTypes.includes(file.type)){
        this.message = "Filetype is wrong (pdf required)"
      }
      if(file.size>500000){
        this.message = 'Too large, max size allowed is 500kb'
      }
    },
    async onSubmit(){
      const formData = new FormData();
      formData.append('file',this.file);
      try{
        await axios.post('http://localhost:3000/upload',formData);
        this.message = 'Uploaded'
      }
      catch(err){
        console.log(err);
        this.message = err.response.data.error
      }
    }
  },
}
</script>

<style lang="less">
@import './Upload.less';
</style>
