<template>
    <div>
        <div v-if="!authKey()">
            <div v-if="this.error">
                <span v-text="this.error"/>
            </div>
            <input type="text" placeholder="Nome de usuário" v-model="username">
            <input type="password" placeholder="Senha" v-model="password">
            <button @click="login()">Login</button>
        </div>
        <div v-if="authKey()">
            <button @click="logout()">Logout</button>
        </div>
    </div>
</template>

<script>
import LoginService from "../services/login";

export default {
  created() {
    this.service = new LoginService(this.$resource);
  },
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    authKey() {
      return localStorage.authKey;
    },
    logout() {
      localStorage.authKey = "";
      this.$router.go("/");
    },
    login() {
      let username = this.username;
      let password = this.password;
      let credentials = {
        name: username,
        password
      };
      this.service.login(credentials).then(user => {
        if (user) {
          localStorage.setItem("authKey", user.authKey);
          this.$router.go("/");
        } else {
          this.error = "Login ou senha incorretos!";
          setTimeout(() => (this.error = ""), 5000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

