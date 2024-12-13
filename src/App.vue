<script>
export default {
  name: 'App',
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <img src="https://static.vecteezy.com/system/resources/previews/000/601/639/original/vector-digital-print-logo-design.jpg" alt="logo">
      </div>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/dictionary" class="nav-link">Dictionary</router-link>
      <router-link to="/calculator" class="nav-link">Calculator</router-link>
      <router-link to="/employees" class="nav-link">Employee</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.navbar {
  background-color: #1F509A; /* Dark background */
  padding: 10px 20px; /* Padding for the navbar */
  width: 100%; /* Full width */
  position: fixed; /* Fixed at the top */
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure it stays above other elements */
}

.navbar .nav-link {
  text-decoration: none;
  color: white;
  margin: 0 15px; /* Spacing between links */
  font-size: 16px;
  font-weight: bold;
}

.navbar-container {
  display: flex;
  justify-content: space-between; /* Space between logo and links */
  align-items: center; /* Center items vertically */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* Center horizontally */
}

.logo {
  width: 50px;
  height: 50px;
}

.logo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.router-view {
  margin-top: 70px; /* Ensure content is below navbar */
  min-height: calc(100vh - 70px); /* Fill remaining height */
  background-color: #f4f4f4; /* Light background */
  padding: 20px;
  box-sizing: border-box; /* Include padding in height */
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav-link {
    margin: 10px 0;
    font-size: 14px;
  }
  .logo {
    margin-bottom: 10px;
  }
}
</style>
