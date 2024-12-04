<template>
  <div class="card">
    <img :src="movie.posterUrl" class="card-img-top" alt="Movie Poster" />
    <div class="card-body">
      <div class="button-container">
        <i
          class="fa"
          :class="isSelected ? 'fa-star' : 'fa-star-o'"
          @click="toggleSelection"
          style="font-size: 2rem; cursor: pointer; color: gold; margin-right: 10px;"
        ></i>
        <a :href="`/movie/${movie.id}`" class="btn btn-dark">Watch Now</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieCard',
  props: {
    movie: Object,
  },
  data() {
    return {
      isSelected: false, // Favorite status
    };
  },
  methods: {
    toggleSelection() {
      this.isSelected = !this.isSelected;
      console.log(`Movie "${this.movie.title}" favorite status: ${this.isSelected ? 'Selected' : 'Not Selected'}`);

      // Save status to localStorage
      this.saveToLocalStorage();

      if (this.isSelected) {
        this.saveFavoriteStatus(); // Save to server
      } else {
        this.deleteFavoriteStatus(); // Remove from server
      }

      this.$emit('toggle-favorite', this.movie, this.isSelected); // Emit event to MyList
    },

    saveToLocalStorage() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const movieIndex = favorites.findIndex(fav => fav.movieId === this.movie.id);
      
      if (movieIndex > -1) {
        favorites[movieIndex].isSelected = this.isSelected;
      } else {
        favorites.push({ movieId: this.movie.id, isSelected: this.isSelected });
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
    },

    loadFavoriteStatus() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const movie = favorites.find(fav => fav.movieId === this.movie.id);

      if (movie) {
        this.isSelected = movie.isSelected;
      }
    },

    async saveFavoriteStatus() {
      const accountName = localStorage.getItem('accountName');
      const movieId = this.movie.id;

      if (!accountName) {
        console.error('User is not logged in');
        return;
      }

      try {
        console.log('Sending data to server:', { accountName, movieId, isSelected: this.isSelected });
        const response = await axios.post('http://localhost:3000/api/favorites', {
          accountName,
          movieId,
          isSelected: this.isSelected,
          posterUrl: this.movie.posterUrl
        });
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error saving favorite status:', error);
      }
    },

    async deleteFavoriteStatus() {
      const accountName = localStorage.getItem('accountName');
      const movieId = this.movie.id;

      if (!accountName) {
        console.error('User is not logged in');
        return;
      }

      try {
        console.log('Deleting favorite from server:', { accountName, movieId });
        const response = await axios.delete('http://localhost:3000/api/favorites', {
          data: { accountName, movieId },
        });
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error deleting favorite status:', error);
      }
    },
  },
  mounted() {
    this.loadFavoriteStatus(); // Load favorite status on component mount
  },
};
</script>

<style scoped>
/* สำหรับ container ที่ห่อหุ้มการ์ดทั้งหมด */
.movies-container {
  display: flex;
  flex-wrap: wrap;  /* ช่วยให้การ์ดสามารถไหลไปในหลายแถวได้ */
  justify-content: flex-start; /* จัดการให้อยู่ตรงกลาง */
  gap: 25px;  /* เพิ่มช่องว่างระหว่างการ์ด */
}

/* การจัดการการ์ด individual */
.card {
  display: inline-block;
  flex-direction: column;  /* การ์ดแต่ละอันจัดในแนวตั้ง */
  justify-content: space-between;
  width: 20rem; /* ความกว้างของการ์ด */
  margin: 0 auto;
  box-sizing: border-box;
}

.card-img-top {
  width: 100%;
  height: 23rem;
  object-fit: cover;
}

.card-body {
  display: inline;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

/* Media Query สำหรับแท็บเล็ตและหน้าจอที่เล็กกว่า 768px */
/* Responsive Styles for movie cards */
@media (max-width: 840px) {
  .card {
    max-width: 200px; /* ลดขนาดการ์ด */
    width: 100%;      /* ใช้ความกว้างเต็ม */
    margin: 5px;      /* ลดระยะห่าง */
  }

  .card img {
    width: 100%;      /* ทำให้รูปภาพยืดเต็มความกว้างของการ์ด */
    height: auto;     /* รักษาอัตราส่วน */
    border-radius: 5px; /* เพิ่มมุมโค้งมน (ถ้าต้องการ) */
  }

  .movie-slider {
    padding: 0 10px; /* เพิ่ม padding เพื่อให้ดูเรียบร้อย */
  }

  .scroll-button {
    display: none; /* ซ่อนปุ่มเลื่อนสำหรับหน้าจอขนาดเล็ก */
  }
}


/* Media Query สำหรับมือถือ */
@media (max-width: 320px) {
  .card {
    width: 50%;  /* ให้การ์ดมีความกว้างเต็มหน้าจอ */
  }

  .card-img-top {
    height: 2rem;  /* ปรับขนาดของภาพให้เหมาะสมกับมือถือ */
  }

  .favorite-status {
    font-size: 0.7rem; /* ขนาดตัวอักษรสำหรับสถานะ favorite */
  }

  .btn-dark {
    font-size: 0.8rem;  /* ขนาดของปุ่ม */
    padding: 8px 16px;  /* เพิ่ม padding ให้ปุ่มใหญ่ขึ้น */
    margin-top: 0px;   /* เพิ่มช่องว่างระหว่างปุ่มและข้อความ */
    margin-right: auto;
    margin-left: auto;  /* เพิ่ม margin ให้ปุ่มอยู่กลาง */
  }

  .card-body {
    display: flex;
    flex-direction: column;  /* จัดการให้เนื้อหาภายในการ์ดเป็นแนวตั้ง */
    align-items: center;     /* จัดให้เนื้อหาภายในการ์ดอยู่ตรงกลาง */
    text-align: center;      /* จัดข้อความให้กึ่งกลาง */
  }

  .movies-container {
    flex-direction: column; /* ทำให้การ์ดแสดงในแนวตั้งสำหรับมือถือ */
    align-items: center;    /* จัดให้การ์ดอยู่ตรงกลาง */
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .card {
    width: 100%;  /* ให้การ์ดมีความกว้างเต็มหน้าจอ */
  }

  .card-img-top {
    height: 4rem;  /* ปรับขนาดของภาพให้เหมาะสมกับมือถือ */
  }

  .favorite-status {
    font-size: 0.7rem; /* ขนาดตัวอักษรสำหรับสถานะ favorite */
  }

  .btn-dark {
    font-size: 0.8rem;  /* ขนาดของปุ่ม */
    padding: 8px 16px;  /* เพิ่ม padding ให้ปุ่มใหญ่ขึ้น */
    margin-top: 0px;   /* เพิ่มช่องว่างระหว่างปุ่มและข้อความ */
    margin-right: auto;
    margin-left: auto;  /* เพิ่ม margin ให้ปุ่มอยู่กลาง */
  }

  .card-body {
    display: flex;
    flex-direction: column;  /* จัดการให้เนื้อหาภายในการ์ดเป็นแนวตั้ง */
    align-items: center;     /* จัดให้เนื้อหาภายในการ์ดอยู่ตรงกลาง */
    text-align: center;      /* จัดข้อความให้กึ่งกลาง */
  }

  .movies-container {
    flex-direction: column; /* ทำให้การ์ดแสดงในแนวตั้งสำหรับมือถือ */
    align-items: center;    /* จัดให้การ์ดอยู่ตรงกลาง */
    justify-content: center;
  }
}

</style>
