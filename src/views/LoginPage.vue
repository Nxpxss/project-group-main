<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="text-center text-white mb-4">Sign In</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label text-white">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            class="form-control" 
            placeholder="Enter your email" 
            required 
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label text-white">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="form-control" 
            placeholder="Enter your password" 
            required 
          />
        </div>
        <button type="submit" class="btn btn-danger w-100">Log In</button>
        <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
      </form>
      <div class="text-center text-white mt-4">
        <p>New to Account? <router-link to="/signup" class="text-danger">Sign up now</router-link></p>
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
      errorMessage: '',
      accountName: ''  // ตัวแปรที่ใช้เก็บชื่อบัญชีจากเซิร์ฟเวอร์
    };
  },
  methods: {
    login() {
      this.errorMessage = '';  // ล้างข้อความผิดพลาดที่มีอยู่ก่อนหน้า

      // ตรวจสอบรูปแบบของอีเมล
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(this.email)) {
        this.errorMessage = 'Please enter a valid email address';
        return;
      }

      // ส่งคำขอเข้าสู่ระบบไปยังเซิร์ฟเวอร์
      axios.post('http://localhost:3000/api/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log('Login response:', response.data);  // ตรวจสอบข้อมูลที่ได้รับจากเซิร์ฟเวอร์

        // ตรวจสอบว่าได้รับ token และ accountName หรือไม่
        if (response.data.token && response.data.accountName) {
          // เก็บ token ใน localStorage เพื่อใช้ในการอนุญาตการเข้าถึง API
          localStorage.setItem('userToken', response.data.token);
          this.$store.dispatch('updateAccountName', response.data.accountName);  // อัปเดต Vuex store
          localStorage.setItem('accountName', response.data.accountName);  // เก็บ accountName ใน localStorage

          // เก็บ accountName ไว้ในตัวแปรของ Vue.js
          this.accountName = response.data.accountName; 
          console.log('Account Name:', this.accountName);  // ตรวจสอบ accountName

          // เปลี่ยนเส้นทางไปหน้า Profile
          this.$router.push('/profile');
        } else {
          this.errorMessage = 'Login failed: Email not registered';
        }
      })
      .catch(error => {
        this.errorMessage = 'Login failed: ' + (error.response?.data?.message || 'Unknown error');
        console.error('Login failed:', error);
      });
    }
  }
};
</script>

<style scoped>
/* ตัวกำหนดพื้นหลังของหน้า login */
.login-container {
  background: url('@/assets/backgrounlogin.jpg') no-repeat center center;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
}

.form-control {
  background-color: #c4c4c4;
  border: 1px solid #444;
  color: #fff;
  padding: 10px;
}

.form-control:focus {
  background-color: #fdfdfd;
  border-color: #3b3939;
}

.btn {
  background-color: #e50914;
  border-color: #e50914;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 12px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #b20710;
}

.text-danger {
  color: #e50914;
}

.text-white {
  color: #fff !important;
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 2rem;
}

.w-100 {
  width: 100%;
}
</style>
