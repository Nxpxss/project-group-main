<template>
  <div class="container-fluid d-flex flex-column align-items-center justify-content-center vh-100" style="background-color: #141414;">
    <div class="rounded-square overflow-hidden border border-white mb-4" style="width: 120px; height: 120px;">
      <img src="@/assets/Netflix-avatar1.png" alt="Profile" class="img-fluid w-100 h-100" style="object-fit: cover;" />
    </div>
    <h2 class="text-white mb-4">{{ accountName || 'Create Your Account Name' }}</h2>
    <router-link to="/" class="btn btn-danger btn-lg text-uppercase w-55">Let's go</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfilePage',
  data() {
    return {
      accountName: '',  // กำหนดเป็นค่าว่างเริ่มต้น
    };
  },
  mounted() {
    this.checkLoginStatus(); // เรียกฟังก์ชั่นตรวจสอบสถานะการล็อกอิน
    this.getAccountName(); // ดึงชื่อบัญชีหลังจากตรวจสอบการล็อกอิน
    this.accountName = this.$store.getters.accountName;  // ดึง accountName จาก Vuexs
  },
  methods: {
    // ฟังก์ชั่นตรวจสอบสถานะการล็อกอิน
    checkLoginStatus() {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        this.$router.push('/login'); // ถ้าไม่มี token ให้ไปหน้า login
      }
    },

    // ฟังก์ชั่นดึงชื่อบัญชีจาก API
    getAccountName() {
      const email = localStorage.getItem('userEmail');  // ดึงอีเมลจาก LocalStorage

      // หากไม่มี email ใน localStorage
      if (!email) {
        this.accountName = 'Create Your Account Name';
        return;
      }

      // Debug: ตรวจสอบ email ที่ดึงมา
      console.log('Email from localStorage:', email);

      // ใช้ GET request เพื่อดึงข้อมูล accountName
      axios.get(`http://localhost:3000/api/getAccountName`, {
        params: { email }  // ส่ง email ใน query parameters
      })
      .then(response => {
        // Debug: ตรวจสอบ response จาก API
        console.log('API response:', response);

        // เช็คว่า response มี accountName หรือไม่
        if (response.data && response.data.accountName) {
          this.accountName = response.data.accountName;
          // Debug: ตรวจสอบค่าของ accountName
          console.log('Account Name:', this.accountName);
          // บันทึก accountName ใน localStorage
          localStorage.setItem('accountName', this.accountName);
        } else {
          this.accountName = 'Create Your Account Name';  // ถ้าไม่มี accountName ใน response
        }
      })
      .catch(error => {
        console.error('Error fetching account name:', error);
        this.accountName = 'Create Your Account Name';  // แสดงข้อความเริ่มต้นหากเกิดข้อผิดพลาด
      });
    }
  }
};
</script>

<!-- <style scoped>
/* การตั้งค่าพื้นฐานสำหรับการจัด layout */
.profile-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  text-align: center;
  background-color: #141414;  /* สีพื้นหลังแบบ Netflix */
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  color: rgb(51, 50, 50);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* การตั้งค่ารูปโปรไฟล์ */
.profile-image {
  width: 120px;
  height: 120px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 3px solid #f1f1f1; /* กรอบสีแดงแบบ Netflix */
}

/* สไตล์ของรูปภาพภายในโปรไฟล์ */
.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ขนาดของหัวข้อ */
h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #fff; /* สีของตัวอักษร */
  text-transform: uppercase; /* ทำให้ตัวอักษรเป็นตัวพิมพ์ใหญ่ */
}

/* สไตล์สำหรับปุ่ม */
.btn-danger {
  background-color: #e50914;  /* สีพื้นหลังปุ่ม */
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 20px;
  text-transform: uppercase; /* ทำให้ตัวอักษรเป็นตัวพิมพ์ใหญ่ */
}

.btn-danger:hover {
  background-color: #b20710;
}

/* การเพิ่ม Transition ให้กับปุ่มเมื่อ Hover */
.btn-danger:focus {
  outline: none;
  box-shadow: 0 0 5px #e50914;
}
</style> -->
