<template>
  <div id="app" class="container">
    <div class="content">
      <h1 class="title">Student Data</h1>
      <p class="subtitle">{{ message }}</p>
      <div class="input-container">
        <input
          type="text"
          id="name"
          v-model="name"
          class="input"
          placeholder="Enter student name"
        />
        <button @click="getInputValue" class="submit-button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "Loading data...",
      name: "",
    };
  },
  methods: {
    getInputValue() {
      axios
        .get(`http://localhost:8080/students?name=${this.name}`)
        .then((response) => {
          this.message = response.data.map(student => student.name).join(', ') || 'No student found.';
        })
        .catch((error) => {
          console.error(error);
          this.message = "Failed to load data.";
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/students")
      .then((response) => {
        this.message = response.data.map(student => student.name).join(', ') || 'No students available.';
      })
      .catch((error) => {
        console.error(error);
        this.message = "Failed to load data.";
      });
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 800px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-direction: column;
}

.content {
  width: 100%;
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.input-container {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  box-sizing: border-box;
}

.submit-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
