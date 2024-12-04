<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Netflix Clone</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/movies">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/MyList">My List</router-link>
          </li>

          <!-- Show account name and logout button if logged in -->
          <li class="nav-item d-flex align-items-center" v-if="accountName">
            <span class="nav-link">{{ accountName }}</span>
            <button class="btn btn-link nav-link text-white" @click="logout">Logout</button>
          </li>

          <!-- Show Sign In button if no account name -->
          <li class="nav-item" v-else>
            <router-link class="nav-link sign-in" to="/login">Sign In</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Navbar',
  data() {
    return {
      accountName: null, // Initial value as null
    };
  },
  mounted() {
    this.checkAccountName(); // Fetch account name when component is mounted
  },
  methods: {
    // Function to check if accountName exists in localStorage
    checkAccountName() {
      const accountName = localStorage.getItem('accountName'); // Retrieve accountName from localStorage
      if (accountName) {
        this.accountName = accountName; // Set accountName from localStorage
        console.log('Account name from localStorage:', this.accountName);
      } else {
        this.getAccountName(); // If not in localStorage, fetch it from the server
      }
    },
    // Fetch account name from the server
    getAccountName() {
      const email = localStorage.getItem('userEmail'); // Get email from localStorage
      if (!email) {
        console.log('No email found');
        return; // If no email, stop fetching data
      }

      console.log('Fetching account name from server...');
      axios.get(`http://localhost:3000/api/getAccountName`, {
        params: { email } // Send email as query parameter
      })
        .then(response => {
          if (response.data && response.data.accountName) {
            this.accountName = response.data.accountName; // Set accountName from server response
            localStorage.setItem('accountName', this.accountName); // Store accountName in localStorage
            console.log('Account name fetched successfully:', this.accountName);
          } else {
            console.log('No account name returned from server');
          }
        })
        .catch(error => {
          console.error('Error fetching account name:', error);
        });
    },

    // Logout function
    logout() {
      console.log('Logging out...');
      this.accountName = null; // Reset accountName in component
      localStorage.removeItem('userEmail'); // Remove email from localStorage
      localStorage.removeItem('accountName'); // Remove accountName from localStorage
      console.log('Logout successful');
      this.$router.push('/login'); // Redirect to login page
    }
  },
  watch: {
    // Watch for route changes to refetch account name
    '$route'(to, from) {
      console.log('Route changed, fetching account name again...');
      this.checkAccountName(); // Check account name again on route change
    }
  }
};
</script>



<style scoped>
/* Navbar styles */
.navbar {
  background-color: #141414; /* Dark color like Netflix */
  padding: 1rem 2rem;
  font-family: Arial, sans-serif;
}

.navbar-brand {
  font-size: 2rem;
  font-weight: bold;
  color: #e50914; /* Red color like Netflix logo */
  letter-spacing: 1px;
  transition: color 0.3s;
}

.navbar-brand:hover {
  color: #ffffff;
}

.nav-link {
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  color: #ffffff;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #e50914; /* Change color on hover like Netflix */
}

.nav-item {
  margin: 0 10px;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%288, 8, 8, 0.8%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.sign-in {
  border: 1px solid #e50914;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #e50914;
  transition: background-color 0.3s, color 0.3s;
}

.sign-in:hover {
  background-color: #e50914;
  color: #ffffff;
}
</style>
