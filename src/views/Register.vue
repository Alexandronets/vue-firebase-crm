<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Home accounting</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid:
                (v$.email.$dirty && v$.email.required.$invalid) ||
                (v$.email.$dirty && v$.email.email.$invalid)}"
        >
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
        >Password should be min {{v$.password.minLength.$params.min}} symbols.  Now {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid:
                (v$.name.$dirty && v$.name.required.$invalid) ||
                (v$.name.$dirty && v$.name.minLength.$invalid)}"
        >
        <label for="name">Name</label>
        <small class="helper-text"
               v-if="v$.name.$dirty && v$.name.required.$invalid"
               :class="{invalid: v$.name.required.$invalid}"
        >Name field cannot be empty</small>
        <small class="helper-text"
               v-if="v$.name.$dirty && v$.name.minLength.$invalid"
               :class="{invalid: v$.name.minLength.$invalid}"
        >Password should be min {{v$.name.minLength.$params.min}} symbols. Now {{name.length}}</small>
      </div>
      <p>
        <label>
          <input
              type="checkbox"
              v-model="rules"
              :class="{invalid: v$.rules.checked}"
          />
          <span>I agree with rules</span>
        </label>
        <small class="helper-text checkbox-error"
               v-if="v$.rules.$dirty && !this.$data.rules"
               :class="{invalid: v$.rules.$dirty && !this.$data.rules}"
        >You should agree with rules</small>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Register
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength, sameAs } from '@vuelidate/validators'
export default {
  name: "Register",
  setup: () => ({
    v$: useVuelidate()
  }),
  data: () => ({
    email: '',
    password: '',
    name: '',
    rules: false
  }),
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
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        await this.$router.push('/')
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
    },
    name: {
      required,
      minLength: minLength(3),
      $autoDirty: true
    },
    rules: {
      $autoDirty: true
    }
  })
}
</script>

<style scoped lang="scss">
.checkbox-error {
  display: block;
}
</style>