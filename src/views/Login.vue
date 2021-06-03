<template>
  <div id="background">
    <div class="Auth">
      <b-tabs fill>
        <b-tab title="sign in">
          <b-form-group class="oauth-button-group" label-align>
            <ul v-for="item in oauth" :key="item" style="padding: 0px">
              <b-button
                class="oauth-button"
                :class="item"
                style="box-shadow: none;"
                @click="oauthLogin(item)"
              >
              </b-button>
            </ul>
          </b-form-group>
          <b-form-group>
            <b-form-input 
              id="username-input"
              v-model="usernameSignIn"
              :state="signInState.username"
              placeholder="Username"
              class="input-block"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input 
              id="password-input"
              v-model="passwordSignIn"
              type="password"
              :state="signInState.password"
              placeholder="Password"
              class="input-block"
            ></b-form-input>
          </b-form-group>
          <b-button class="login-button" @click="login">SIGN IN</b-button>
          <button class="forget-password">forget password</button>
        </b-tab>
        <b-tab title="sign up">
          <b-form-group
            style="margin-top: 30px;"
          >
            <b-form-input 
              id="email-input"
              v-model="email"
              :state="signUpState.email"
              placeholder="Email"
              class="input-block"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input 
              id="username-input"
              v-model="usernameSignUp"
              :state="signUpState.username"
              placeholder="Username"
              class="input-block"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input 
              id="password-input"
              v-model="passwordSignUp"
              type="password"
              :state="signUpState.password"
              placeholder="Password"
              class="input-block"
            ></b-form-input>
          </b-form-group>
          <b-button class="signup-button">SIGN UP</b-button>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import { API, GITHUB } from '@/utils/constant.js';
import qs from 'query-string';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      usernameSignIn: '',
      passwordSignIn: '',
      usernameSignUp: '',
      passwordSignUp: '',
      oauth: [
        'google',
        'github',
      ],
      signInState: {
        username: null,
        password: null,
      },
      signUpState: {
        email: null,
        username: null,
        password: null,
      }
    };
  },
  watch: {
    usernameSignIn(val) {
      if (val.length < 8) {
        this.signInState.username = false;
      } else {
        this.signInState.username = true;
      }
    },
    passwordSignIn(val) {
      if (val.length < 8) {
        this.signInState.password = false;
      } else {
        this.signInState.password = true;
      }
    },
    email(val) {
      if (val.length < 8) {
        this.signUpState.email = false;
      } else {
        this.signUpState.email = true;
      }
    },
    usernameSignUp(val) {
      if (val.length < 8) {
        this.signUpState.username = false;
      } else {
        this.signUpState.username = true;
      }
    },
    passwordSignUp(val) {
      if (val.length < 8) {
        this.signUpState.password = false;
      } else {
        this.signUpState.password = true;
      }
    }
  },
  methods: {
    async login() {
      const config = {
        strategy: "local",
        email: this.usernameSignIn,
        password: this.passwordSignIn,
      };
      let result = '';
      let status = false;
      await this.axios.post(API.AUTH, config)
      .then(res => {
        result = res;
        status = true;
      })
      .catch(err => {
        console.log(err);
        status = false;
      });

      if (!status) {
        return;
      }
      this.$cookie.set('jwt', result.data.accessToken, 30);

      this.$router.push('/');
    },
    oauthLogin(method) {
      if (method === 'github') {
        const query = qs.stringify({
          client_id: '1a071af1b32a01e80f00',
          scope: GITHUB.SCOPE,
          state: GITHUB.LOGIN_STATE,
        });
        window.location.href = `${GITHUB.AUTH_URL}?${query}`;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
#background {
  background:radial-gradient(circle farthest-corner at left, rgb(88, 97, 219), rgb(93, 159, 197));
  //background-color: lightblue;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
}

.Auth {
  width: 600px;
  height: 440px;
  background-color: rgba(240, 245, 248, 0.75);
  border-radius: 10px;
  margin: auto;
  padding: 20px 70px;
}

.oauth-button-group {
  width: 140px;
  margin: 15px auto;
}

.oauth-button {
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border-radius: 50%;
  float: left;
  background-color: transparent;
  border: 0px;
  &:active, &:focus {
    outline: 0px;
    box-shadow: none;
  }
}

.google {
  background-image: url('../assets/Google.svg');
}

.github {
  background-image: url('../assets/Github.png');
  background-size: auto;
  background-repeat: no-repeat;
  background-size: 50px auto;
}

.btn-secondary:not(:disabled):not(.disabled).active,
.btn-secondary:not(:disabled):not(.disabled):active,
.show>.btn-secondary.dropdown-toggle {
  background-color: transparent;
}

.login-button {
  margin-top: 20px;
  width: 100%;
  height: 40px;
}

.signup-button {
  margin-top: 10px;
  width: 100%;
  height: 40px;
}

.input-block {
  margin-top: 15px;
  height: 45px;
}

.forget-password {
  background-color: transparent;
  border-color: transparent;
  width: 100%;
  color: rgb(107, 121, 255);
  text-align: center;
  &:focus {
    outline: 0px;
  }
}
</style>