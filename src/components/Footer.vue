<template>
    <footer class="footer bg-dark text-light py-5">
      <div class="container">
        <!-- Links Section -->
        <div class="row">
          <div class="col-12 mb-4 text-center">
            <a href="#" class="footer-link mx-2">FAQ</a>
            <a href="#" class="footer-link mx-2">Help Center</a>
            <a href="#" class="footer-link mx-2">Account</a>
            <a href="#" class="footer-link mx-2">Media Center</a>
            <a href="#" class="footer-link mx-2">Investor Relations</a>
            <a href="#" class="footer-link mx-2">Jobs</a>
            <a href="#" class="footer-link mx-2">Terms of Use</a>
            <a href="#" class="footer-link mx-2">Privacy</a>
            <a href="#" class="footer-link mx-2">Cookie Preferences</a>
            <a href="#" class="footer-link mx-2">Corporate Information</a>
            <a href="#" class="footer-link mx-2">Contact Us</a>
          </div>
        </div>       
        <!-- Copyright Section -->
        <div class="row">
          <div class="col-12 text-center">
            <p class="mb-0">&copy; 2024 Your Movie App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  /* Custom Styles for Footer */
  .footer-link {
    color: #737373;
    font-size: 0.875rem;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-link:hover {
    color: #ffffff;
  }
  
  .text-light i {
    font-size: 1.5rem;
    transition: color 0.3s;
  }
  
  .text-light i:hover {
    color: #e50914; /* สีแดงเมื่อ hover คล้าย Netflix */
  }
  </style>
  