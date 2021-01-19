<template>
  <div class="register-card">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="idCard"
              label="ID Card"
              :counter="13"
              :rules="idCardRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="firstname"
              label="First name"
              :rules="firstnameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastname"
              label="Last name"
              :rules="lastnameRules"
              required
            ></v-text-field>
            <label for="dateofbirth" class="mr-3">ฺBirth Date</label>
            <input
              type="date"
              name="dateofbirth"
              id="dateofbirth"
              class="birthdate-input"
              v-model="dateOfBirth"
            />
          </v-col>
        </v-row>
        <v-row class="mt-3" justify="center">
          <v-btn
            color="success"
            @click="register()"
            :loading="loading"
            :disabled="!valid || !dateOfBirth"
          >
            register
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar" :multi-line="multiline" timeout="4000" color="success">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data: () => {
    return {
      firstname: "",
      lastname: "",
      idCard: "",
      dateOfBirth: "",
      valid: false,
      idCardRules: [
        v => !!v || "id card number is required",
        v => v.length === 13 || "id card number must be 13 characters",
        v => /^[0-9]+$/.test(v) || "number only"
      ],
      firstnameRules: [v => !!v || "firstname is required"],
      lastnameRules: [v => !!v || "lastname is required"],
      snackbar: false,
      loading: false,
      text: "",
      multiline: true
    };
  },
  methods: {
    register: function() {
      this.loading = true;
      const templateRegister = {
        idCard: +this.idCard,
        Name: this.firstname.trim() + " " + this.lastname.trim(),
        dateOfBirth: this.convertDate(this.dateOfBirth)
      };
      console.log(templateRegister);
      axios
        .post(`http://localhost:9000/saveProfile`, templateRegister, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          const res = response.data;
          this.text = `Success !! your name is : ${res.FirstName} ${res.LastName} and your age is : ${res.Age}`;
          this.snackbar = true;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          this.errors.push(e);
        });
    },
    convertDate: function(date) {
      return date
        .split("-")
        .reverse()
        .join("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.register-card {
  border: solid 1px rgb(206, 206, 206);
  width: 400px;
  padding: 20px;
}
.birthdate-input {
  border: solid 1px;
}
</style>
