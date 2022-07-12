<template>
  <div>
    <div class="page-title">
      <h3>{{ title }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: v$.name.$dirty && v$.name.required.$invalid}"
        >
        <label for="description">Name</label>
        <small class="helper-text"
               v-if="v$.name.$dirty && v$.name.required.$invalid"
               :class="{invalid: v$.name.required.$invalid}"
        >Name field cannot be empty</small>
        <small class="helper-text"
               v-if="v$.name.$dirty && v$.name.minLength.$invalid"
               :class="{invalid: v$.name.minLength.$invalid}"
        >Password should be min {{v$.name.minLength.$params.min}} symbols</small>
      </div>

      <div class="switch">
        <label>
          Українська
          <input type="checkbox" v-model="isEnLocale">
          <span class="lever"></span>
          English
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Refresh
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>

</template>

<script>
import {mapGetters, mapActions} from "vuex";
import useVuelidate from "@vuelidate/core";
import messages from "@/utils/messages";
import {minLength, required} from '@vuelidate/validators'

export default {
  name: "Profile",
  setup: () => ({
    v$: useVuelidate()
  }),
  computed: {
    ...mapGetters(['info'])
  },
  data: () => ({
    name: '',
    isEnLocale: true,
    title: 'Profile'
  }),
  mounted() {
    this.name = this.info.name
    this.isEnLocale = this.info.locale === 'en-US'
    setTimeout(function (){
      M.updateTextFields()
    }, 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSubmit() {
      if(this.v$.$invalid) {
        this.v$.$validate()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEnLocale ? 'en-US' : 'ua-UA'
        })
      } catch(e) {}
    }
  },
  validations: () => ({
    name: {
      required,
      minLength: minLength(3),
      $autoDirty: true
    }
  })
}
</script>

<style scoped lang="scss">
.switch {
  margin-bottom: 2rem;
}
</style>