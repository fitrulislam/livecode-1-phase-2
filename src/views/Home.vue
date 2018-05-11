<template>
  <div class="container">
    <div class="input">
      <div class="form-group">
        <input type="text" class="form-control" v-model="email" placeholder="email">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="name" placeholder="name">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-info" @click="login" :disabled="ready">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      email: '',
      name: '',
      emailStatus: false,
      nameStatus: false
    }
  },
  watch: {
    email: function (val) {
      if (val.length > 0) {
        if (this.validEmail(val) === true) {
          this.emailStatus = true
        } else {
          this.emailStatus = false
        }
      } else {
        this.emailStatus = false
      }
    },
    name: function (val) {
      if (val.length > 0) {
        this.nameStatus = true
      } else {
        this.nameStatus = false
      }
    }
  },
  computed: {
    ready () {
      if (this.emailStatus === true && this.nameStatus === true) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    validEmail (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    login () {
      axios.post('http://35.198.212.156/request-token', {
        email: this.email,
        name: this.name
      })
        .then(response => {
          localStorage.setItem('token', response.data.user.uid)
          localStorage.setItem('name', response.data.user.name)
          localStorage.setItem('statusLogin', 'connected')
          this.$router.push('imagepage')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  justify-content: center;
}
.container .input {
  align-self: center;
  width: 350px;
}
</style>
