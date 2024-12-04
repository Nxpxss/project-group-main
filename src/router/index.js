import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import AccountPage from '@/views/Account.vue'; // กำหนดชื่อตรงกับไฟล์ Account.vue
import MovieDetailPage from '@/views/MovieDetailPage.vue';
import MyListPage  from '@/views/MyList.vue';
import MovieCard from '@/components/MovieCard.vue';

// ฟังก์ชันเพื่อตรวจสอบสถานะการล็อกอิน
function isLoggedIn() {
  return !!localStorage.getItem('userToken'); // ถ้ามี userToken ใน Local Storage แสดงว่าเคยล็อกอินแล้ว
}

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/Mylist', component: MyListPage },
  {
    path: '/profile',
    component: ProfilePage,
    meta: { requiresAuth: true } // กำหนดว่าหน้านี้ต้องการการยืนยันตัวตน
  },
  {
    path: '/account',
    component: AccountPage, // ตรวจสอบว่าชื่อ component ตรงกับชื่อที่นำเข้า
    meta: { requiresAuth: true } // กำหนดว่าหน้านี้ต้องการการยืนยันตัวตน
  },
  { path: '/movie/:id', component: MovieDetailPage },
  { path: '/mylist/movie/:id', component: MyListPage }, // เส้นทางใหม่สำหรับรายการภาพยนตร์
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ใช้ Navigation Guard เพื่อเช็คสถานะการเข้าถึง
router.beforeEach((to, from, next) => {
  // ถ้าหน้านั้นต้องการการยืนยันตัวตน และผู้ใช้ยังไม่ได้ล็อกอิน
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
    next('/login'); // รีไดเร็กไปที่หน้า Login
  } else {
    next(); // อนุญาตให้ผ่านไปยังหน้าที่ต้องการ
  }
});

export default router;
