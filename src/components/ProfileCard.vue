<template>
    <div class="card" style="width: 18rem;">
      <img :src="profile.picture" class="card-img-top" alt="Profile Picture">
      <div class="card-body">
        <h5 class="card-title">{{ profile.name }}</h5>
        <p class="card-text">{{ profile.email }}</p>
        <a href="/profile" class="btn btn-primary">Go to Profile</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfileCard',
    props: {
      profile: Object
    }
  };
  </script>
  