<template>
  <div class="signup-container" :style="{ backgroundImage: 'url(' + require('@/assets/backgrounlogin.jpg') + ')', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center' }">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-6">
          <!-- ลบ background-color เพื่อไม่ให้สีพื้นหลังแสดง -->
          <div class="p-5 rounded-3 shadow-lg">
            <h1 class="text-center text-white mb-4" style="font-size: 2rem;">Create an Account</h1>
            <form @submit.prevent="signup" class="form-signup">
              <div class="mb-3">
                <label for="email" class="form-label text-white">Email</label>
                <input type="email" v-model="email" class="form-control form-control-lg" required placeholder="Enter your email" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label text-white">Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" required placeholder="Enter your password" />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label text-white">Confirm Password</label>
                <input type="password" v-model="confirmPassword" class="form-control form-control-lg" required placeholder="Confirm your password" />
              </div>
              <button type="submit" class="btn btn-danger w-100 py-2 btn-lg">Sign Up</button>
              <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
              <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',  
    };
  },
  methods: {
    signup() {
      this.errorMessage = '';
      this.successMessage = '';

      // Validate passwords match (Only this basic check)
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      // Log email and password to check if the data is correct before sending
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      console.log('Confirm Password:', this.confirmPassword);

      // Send signup request to server
      axios.post('http://localhost:3000/api/signup', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        // Log the response from server for debugging
        console.log('Server Response:', response);

        // If the response contains a message, show success message
        if (response && response.data && response.data.message) {
          this.successMessage = response.data.message;

          // Store the email in localStorage
          localStorage.setItem('userEmail', this.email);

          // Redirect to another page if needed
          console.log('Redirecting to /account');
          this.$router.push('/account');
        } else {
          this.errorMessage = 'Signup failed: Missing message in response';
        }
      })
      .catch(error => {
        // Log the error response for debugging
        console.error('Signup failed:', error);
        this.errorMessage = 'Signup failed: ' + (error.response?.data?.message || 'Unknown error');
      });
    }
  }
};
</script>
