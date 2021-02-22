<template>
  <div id="background">
    <div class="Auth">
      <b-tabs fill>
        <b-tab title="sign in">
          <b-form-group class="oauth-button-group" label-align>
            <ul v-for="item in oauth" :key="item" style="padding: 0px">
              <b-button class="oauth-button"></b-button>
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
          <b-button class="login-button">SIGN IN</b-button>
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
  }
}
</script>
<style lang="scss" scoped>
#background {
  background-color: lightblue;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
}

.Auth {
  width: 600px;
  height: 440px;
  background-color: rgb(240, 245, 248);
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