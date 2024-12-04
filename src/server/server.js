const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// ตัวอย่างข้อมูลผู้ใช้ (รวมถึงชื่อบัญชี accountName)
let users = [
  { email: 'john.doe@gmail.com', password: 'password456', accountName: 'John Doe' }
];

// ตัวแปรเก็บสถานะ favorite สำหรับแต่ละผู้ใช้และภาพยนตร์
let favorites = []; 

// API สำหรับดึง accountName จาก email
app.get('/api/getAccountName', (req, res) => {
  const email = req.query.email;  // ดึง email จาก query parameter

  // ค้นหาผู้ใช้ที่มีอีเมลที่ระบุ
  const user = users.find(user => user.email === email);
  if (user) {
    // ถ้าเจออีเมล ให้ส่ง accountName กลับ
    res.status(200).send({ accountName: user.accountName });
  } else {
    // ถ้าไม่เจอ ให้ส่ง accountName เป็นค่าว่าง
    res.status(200).send({ accountName: '' });
  }
});

// API สำหรับสมัครสมาชิก (Signup)
app.post('/api/signup', (req, res) => {
  const { email, password, accountName } = req.body;

  // ตรวจสอบว่ามี email นี้ในระบบแล้วหรือไม่
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).send({ message: 'Email already in use' });
  }

  // เพิ่มผู้ใช้ใหม่ที่รวมถึง accountName
  users.push({ email, password, accountName });
  res.status(201).send({ message: 'Signup successful', accountName });
});

// API สำหรับเข้าสู่ระบบ (Login)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // ค้นหาผู้ใช้ในระบบ
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).send({ message: 'Invalid email or password' });
  }

  // สร้าง token (ในที่นี้ใช้ตัวอย่างง่าย ๆ)
  const token = 'token_test';

  // ส่งข้อมูลกลับไปให้ client รวมถึง accountName
  res.status(200).send({
    message: 'Login successful',
    token: token, // สามารถใช้ JWT หรือวิธีอื่นๆ ในการสร้าง token ได้
    accountName: user.accountName // ส่งชื่อบัญชีกลับไปให้ Client
  });
});

// API สำหรับบันทึก accountName
app.post('/api/accountName', (req, res) => {
  const { email, accountName } = req.body;
  console.log('Received data:', { email, accountName });

  // ตรวจสอบว่า email และ accountName ถูกส่งมาใน request
  if (!email || !accountName) {
    return res.status(400).send({ message: 'Email and Account Name are required' });
  }

  // ค้นหาผู้ใช้ที่มี email ที่ส่งมา
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  // อัปเดตชื่อบัญชีให้กับผู้ใช้
  user.accountName = accountName;

  // ส่งข้อความยืนยัน
  res.status(200).send({ message: 'Account name updated successfully', accountName: user.accountName });
});

// API สำหรับบันทึกสถานะการเลือกดาว (favorite)
app.post('/api/favorites', (req, res) => {
  const { accountName, movieId, isSelected, posterUrl } = req.body; // เพิ่ม posterUrl

  console.log('Received data for favorite update:', {
    accountName: accountName,
    movieId: movieId,
    isSelected: isSelected,
    posterUrl: posterUrl, // แสดง posterUrl
  });

  // ตรวจสอบว่ามีการส่งค่า accountName, movieId, isSelected และ posterUrl หรือไม่
  if (!accountName || !movieId || typeof isSelected !== 'boolean' || !posterUrl) {
    return res.status(400).send({ message: 'Missing required fields: accountName, movieId, isSelected, or posterUrl' });
  }

  // ค้นหาผู้ใช้ที่มี accountName
  const user = users.find(user => user.accountName === accountName);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  // อัปเดตสถานะ favorite ของผู้ใช้ รวมถึง posterUrl
  const favoriteIndex = favorites.findIndex(fav => fav.accountName === accountName && fav.movieId === movieId);
  if (favoriteIndex === -1) {
    favorites.push({ accountName, movieId, isSelected, posterUrl }); // เก็บ posterUrl
  } else {
    favorites[favoriteIndex].isSelected = isSelected;
    favorites[favoriteIndex].posterUrl = posterUrl; // อัปเดต posterUrl
  }
  console.log('Updated favorites:', favorites);

  res.status(200).send({ message: 'Favorite status updated successfully' });
});

// API สำหรับดึงรายการภาพยนตร์ที่เป็น favorite ทั้งหมดสำหรับผู้ใช้ที่ระบุ
app.get('/api/favorites', (req, res) => {
  const { accountName } = req.query;

  // ค้นหารายการ favorite ทั้งหมดของผู้ใช้ที่ระบุ
  const userFavorites = favorites.filter(fav => fav.accountName === accountName && fav.isSelected);

  // ถ้ามีรายการ favorite ที่ตรงกับผู้ใช้ ให้ส่งรายการนั้นกลับไป
  if (userFavorites.length > 0) {
    res.status(200).send({ favorites: userFavorites });
  } else {
    // ถ้าไม่มีรายการ favorite ที่เลือก ให้ส่งกลับเป็น array ว่าง
    res.status(200).send({ favorites: [] });
  }
});

// API สำหรับลบสถานะ favorite (ลบแค่ movieId)
app.delete('/api/favorites', (req, res) => {
  const { accountName, movieId } = req.body;

  console.log('Received data to delete favorite:', {
    accountName: accountName,
    movieId: movieId
  });

  // ตรวจสอบว่ามีการส่ง accountName และ movieId หรือไม่
  if (!accountName || !movieId) {
    return res.status(400).send({ message: 'Missing required fields: accountName or movieId' });
  }

  // ค้นหาผู้ใช้ที่มี accountName
  const user = users.find(user => user.accountName === accountName);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  // ค้นหาบันทึก favorite ที่ต้องการลบ
  const favoriteIndex = favorites.findIndex(fav => fav.accountName === accountName && fav.movieId === movieId);
  if (favoriteIndex === -1) {
    return res.status(404).send({ message: 'Favorite not found' });
  }

  // ลบรายการโปรดที่พบ
  favorites.splice(favoriteIndex, 1);

  console.log('Updated favorites:', favorites);

  // ส่งคำตอบกลับหลังจากลบรายการโปรด
  res.status(200).send({ message: 'Favorite deleted successfully' });
});

// รันเซิร์ฟเวอร์บนพอร์ต 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
