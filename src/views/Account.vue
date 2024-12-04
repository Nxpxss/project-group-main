<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark">
    <div class="card shadow-lg border-0 rounded-4" style="width: 100%; max-width: 600px; background-color: rgba(20, 20, 20, 0.95);">
      <div class="card-body p-5 text-center">
        <!-- เพิ่มความหนาของฟอนต์และใช้ฟอนต์ที่เรียบง่าย -->
        <h1 class="card-title text-center text-white mb-4" style="font-size: 2.8rem; font-weight: 700; font-family: 'Segoe UI', sans-serif;">Create Your Account</h1>

        <form @submit.prevent="submitAccountName">
          <div class="mb-4">
            <!-- ใช้สีที่ไม่เด่นเกินไปสำหรับ label -->
            <label for="accountName" class="form-label text-muted" style="font-size: 1rem;">Account Name</label>
            <input
              type="text"
              id="accountName"
              class="form-control form-control-lg text-center rounded-3"
              v-model="accountName"
              placeholder="Enter your account name"
              style="background-color: #333; color: #fff; border: none; padding: 15px; font-size: 1.2rem;"
              required
            />
            <div v-if="errorMessage" class="text-danger mt-3" style="font-size: 0.9rem;">{{ errorMessage }}</div>
          </div>

          <!-- ปรับปุ่มให้ทันสมัยด้วยการใช้โทนสีที่นุ่มนวลขึ้น -->
          <button
            type="submit"
            class="btn btn-gradient w-100 py-3 rounded-3"
            :disabled="isSubmitting"
            style="font-size: 1.1rem; font-weight: 600; background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); border: none; color: #fff; box-shadow: 0 4px 12px rgba(255, 65, 108, 0.6);">
            <span v-if="isSubmitting">Saving...</span>
            <span v-else>Save</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      accountName: '',  
      errorMessage: '',
      isSubmitting: false,
    };
  },
  methods: {
    submitAccountName() {
      // Prevent submitting if already submitting
      if (this.isSubmitting) {
        console.log("Already submitting...");
        return;
      }

      // Reset error message and set submitting status to true
      this.errorMessage = '';
      this.isSubmitting = true;
      console.log("isSubmitting set to true");

      // Retrieve email from localStorage
      const email = localStorage.getItem('userEmail');
      console.log("Retrieved email from localStorage:", email);

      // Validate if email is found
      if (!email) {
        this.errorMessage = 'No email found. Please sign up first.';
        this.isSubmitting = false;
        console.log("No email found, exiting submit.");
        return;
      }

      // Validate account name
      if (!this.accountName.trim()) {
        this.errorMessage = 'Account name cannot be empty';
        this.isSubmitting = false;
        console.log("Account name is empty, exiting submit.");
        return;
      }

      // Log email and account name before sending to the server
      console.log("Sending data to server:", { email, accountName: this.accountName });

      // Send account name to the server
      axios.post('http://localhost:3000/api/accountName', {
        email: email,  // Use the email stored in localStorage
        accountName: this.accountName
      })
      .then(response => {
        console.log("Server response:", response);  // Log the server's response

        if (response && response.data && response.data.message) {
          // If the account name was saved successfully
          this.$router.push('/profile');
          this.accountName = '';  // Clear the input field after success
          console.log("Account name saved successfully, input cleared.");
        } else {
          this.errorMessage = 'Failed to save account name';
          console.log("Failed to save account name");
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error saving account name:', error);
        this.errorMessage = error.response?.data?.message || 'Unknown error';
      })
      .finally(() => {
        this.isSubmitting = false; // Reset isSubmitting after request completes
        console.log("isSubmitting reset to false");
      });
    }
  }
};
</script>
