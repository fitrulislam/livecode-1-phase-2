<template>
<div class="container">
  <h4>Hello {{ name }} ^^</h4>
  <button type="button" name="button" class="btn btn-danger btn-md" @click="signout">Sign Out</button><br><br>
  <div class="input">
    <div class="form-group">
      <input type="file" @change="getImage">
    </div>
    <div class="form-group">
      <button type="button" name="button" class="btn btn-info btn-md" @click="addImage" :disabled="ready">Add Image</button>
    </div>
  </div>
  <div class="container-fluid bg-3 text-center">
    <div class="row">
      <div v-for="(image,index) in images" :key="index" class="col-sm-3">
        <p>{{image.user.name}}</p>
        <img :src="image.url" class="img-responsive" style="width:100%" alt="image">
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'imagepage',
  data () {
    return {
      image: null,
      status: false,
      name: ''
    }
  },
  computed: {
    images () {
      return this.$store.state.images
    },
    ready () {
      if (this.status === true) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    getImage (event) {
      this.image = event.target.files[0]
      this.status = true
    },
    addImage () {
      let formData = new FormData()
      formData.append('photo', this.image)
      this.$store.dispatch('addImage', formData)
      this.status = false
    },
    signout () {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('statusLogin')
      location.reload()
    }
  },
  created: function () {
    this.$store.dispatch('getImage')
    this.name = localStorage.getItem('name')
  }
}
</script>

<style scoped>
.container .input {
  align-items: center;
}
.container h4 {
  font-family: 'Playfair Display', serif;
}
.container p {
  font-family: 'Titan One', cursive;
}
.container img {
  max-width: 250px;
}
</style>
