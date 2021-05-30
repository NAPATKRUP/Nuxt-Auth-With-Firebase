<template>
  <v-container>
    <v-card class="pa-4">
      <h1 class="headling">Login</h1>
      <form @submit.prevent="login" @submit.enter="login">
        <v-text-field
          v-model="account.email"
          label="E-mail"
          hint="Enter your email"
          required
        ></v-text-field>
        <v-text-field
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          hint="At least 6 characters"
          v-model="account.password"
          class="input-group--focused"
          @click:append="showPassword = !showPassword"
          required
        ></v-text-field>
        <v-btn
          type="submit"
          class="mr-4"
          color="primary"
        >
          Login
        </v-btn>
        <div v-if="isError" class="my-4">
          <p class="red--text overline">{{ errMessage }}</p>
        </div>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  data: () => ({
    account: {
      email: "",
      password: ""
    },
    isError: false,
    errMessage: "",
    showPassword: false
  }),
  methods: {
    login(e) {
      e.preventDefault();
      this.$store
        .dispatch("users/login", this.account)
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          this.isError = true;
          this.errMessage = error.code;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });
    }
  }
};
</script>
