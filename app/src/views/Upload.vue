<template>
  <div class="upload">
    <h1>Upload page</h1>
    <div class="file-uploader">
   <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="text">
        <!-- <label>Upload File</label><br/> -->
        <label class="file-input">
          <input
            type="file"
            @change="onSelect"
          />
          Upload File
        </label>
        <label class="file-input">
          <input
            type="text"
            v-model="inputText"
            required="true"
          />
        </label>
        <br/>
        <div class="chosen-file">
          <label>
            Chosen File: <h5>{{chosenFileName}}</h5>
          </label>
        </div>
      </div>
      <div>
        <label class="submit">
          <button class="submit-button">Submit</button>
          Submit
        </label>
      </div>
      <div class="message">
        <h5>{{message}}</h5>
      </div>
      <div class="uploaded-files">
        <label>Uploaded Files:</label>
        <h5>{{fileNames.data}}</h5>
        <!-- <ul class="file-list"></ul> -->
      </div>
   </form>
  </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'FileUpload',

  setup() {
    const chosenFileName = ref('')
    const message = ref('');
    const fileNames = ref([]);
    const inputText = ref('');

    let file;

    function onSelect(event){
      const allowedTypes = ["application/pdf"];
      console.log(event.target.files[0]);
      file = event.target.files[0];
      chosenFileName.value = file.name;
      if(!allowedTypes.includes(file.type)){
        message.value = "Filetype is wrong (pdf required)"
      } else if(file.size>500000){
        message.value = 'Too large, max size allowed is 500kb'
      } else {
        message.value = '';
      }
    }
    async function onSubmit(){
      const formData = new FormData();
      formData.append('file',file);
      try{
        await axios.post('http://localhost:3000/upload/' + inputText.value ,formData);
        fileNames.value = await axios.get('http://localhost:3000/upload');
        message.value = 'Uploaded'
      }
      catch(err){
        console.log(err);
        message.value = err.response.data.error
      }
    }
 
    return {
      chosenFileName,
      message,
      fileNames,
      inputText,
      onSelect,
      onSubmit,
    };
  },
});
</script>

<style lang="less">
@import './Upload.less';
</style>
