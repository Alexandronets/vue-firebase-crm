<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Home accounting</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email" @input="setEmail"
            :class="{invalid:
                (v$.email.$dirty && v$.email.required.$invalid) ||
                (v$.email.$dirty && v$.email.email.$invalid)}"
            />
        <label for="email">Email</label>
        <small class="helper-text"
               v-if="v$.email.$dirty && v$.email.required.$invalid"
               :class="{invalid: v$.email.required.$invalid}"
        >Email field cannot be empty</small>
        <small class="helper-text"
               v-if="v$.email.$dirty && v$.email.email.$invalid"
               :class="{invalid: v$.email.email.$invalid}"
        >Please type correct email address</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            autocomplete="false"
            v-model.trim="password"
            :class="{invalid:
                (v$.password.$dirty && v$.password.required.$invalid) ||
                (v$.password.$dirty && v$.password.minLength.$invalid)}"
        >
        <label for="password">Password</label>
        <small class="helper-text"
               v-if="v$.password.$dirty && v$.password.required.$invalid"
               :class="{invalid: v$.password.required.$invalid}"
        >Password field cannot be empty</small>
        <small class="helper-text"
               v-if="v$.password.$dirty && v$.password.minLength.$invalid"
               :class="{invalid: v$.password.minLength.$invalid}"
        >Password should be min {{v$.password.minLength.$params.min}} symbols</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Login
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        You have no account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import messages from "@/utils/messages";
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
  name: "Login",
  setup: () => ({
    v$: useVuelidate()
  }),
  data: () => ({
    email: '',
    password: ''
  }),
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    setEmail($event) {
      this.v$.email.$touch()
    },
    async onSubmit() {
      if(this.v$.$invalid) {
        this.v$.$validate()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
        throw e
      }

    }
  },
  validations: () => ({
    email: {
      email,
      required,
      $autoDirty: true
    },
    password: {
      required,
      minLength: minLength(6),
      $autoDirty: true
    }
  })
}
</script>

<style scoped lang="scss">
.card {
  .card-action {
    border-top: none;
  }
}
</style>