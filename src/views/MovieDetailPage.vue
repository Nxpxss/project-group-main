<template>
    <div>
      <Navbar />
      <div class="movie-watch-page container-fluid">
        <div class="row movie-background">
          <!-- Video Player Section -->
          <div class="col-md-12 video-container">
            <video 
              class="video-player" 
              controls 
              autoplay 
              :poster="movie.posterUrl">
              <!-- ตัวอย่าง Video ที่ฝังในเครื่อง -->
              <source src="https://www.example.com/your-movie.mp4" type="video/mp4">
              <!-- ข้อความแสดงเมื่อวิดีโอเล่นไม่ได้ -->
              Your browser does not support the video tag.
            </video>
          </div>
          <!-- Movie Information Overlay -->
          <div class="col-md-15 movie-info">
            <div class="container">
              <div class="buttons mt-3">
                <button class="btn btn-primary btn-lg play-button">
                  <i class="fas fa-play"></i> Play
                </button>
                <button class="btn btn-secondary btn-lg more-info-button">
                  <i class="fas fa-info-circle"></i> More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'MovieWatchPage',
    components: {
      Navbar,
      Footer
    },
    data() {
      return {
        movie: {
          title: 'Movie Title',
          description: 'This is a detailed description of the movie.',
          posterUrl: 'https://via.placeholder.com/1200x600', // URL ของภาพพื้นหลังหรือโปสเตอร์
          videoUrl: 'https://www.example.com/your-movie.mp4' // URL ของวิดีโอที่จะเล่น
        }
      };
    }
  };
  </script>
  
  <style scoped>
  /* Custom Styles for Movie Watch Page */
  .movie-watch-page {
    color: #ffffff;
  }
  
  .movie-background {
    background-color: #000; /* พื้นหลังสีดำ */
    height: 100vh; /* ใช้ความสูงเต็มจอ */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .video-container {
    position: relative;
    width: 90%;
    height: 90vh; /* ความสูงของหน้าจอวิดีโอ */
    margin-bottom: 20px;
  }
  
  .video-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .movie-info {
    background: rgba(0, 0, 0, 0.6); /* เพิ่มความโปร่งใส */
    padding: 20px;
    border-radius: 10px;
    max-width: 800px;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: white;
    padding-bottom: 20px;
  }
  
  .movie-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .movie-description {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }
  
  .buttons {
    display: flex;
    gap: 15px;
  }
  
  .play-button {
    background-color: #e50914;
    color: #ffffff;
    border: none;
    font-size: 1.2rem;
  }
  
  .more-info-button {
    background-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
    border: none;
    font-size: 1.2rem;
  }
  
  .play-button:hover, .more-info-button:hover {
    opacity: 0.8;
  }
  </style>
  