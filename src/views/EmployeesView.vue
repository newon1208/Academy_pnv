<template>
  <div>
    <h1>List of Employees</h1>
    <button class="btn btn-success" @click="openAddModal">+ Add new</button>
    <table class="employee-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Date of birth</th>
          <th>Gender</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.dob }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ formatCurrency(employee.salary) }}</td>
          <td>
            <button class="btn btn-primary" @click="openUpdateModal(employee, index)">
              <i class="fas fa-edit"></i> Update
            </button>
            <button class="btn btn-danger" @click="deleteEmployee(index)">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
            <button class="btn btn-info" @click="viewDetails(index)">
              <i class="fas fa-info-circle"></i> Detail
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add New Employee Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h2>Add New Employee</h2>
        <form @submit.prevent="addNewEmployee">
          <label>Name:</label>
          <input v-model="newEmployee.name" type="text" required />

          <label>Date of Birth:</label>
          <input v-model="newEmployee.dob" type="date" required />

          <label>Gender:</label>
          <select v-model="newEmployee.gender" required>
            <option value="Nam">Male</option>
            <option value="Nữ">Female</option>
          </select>

          <label>Salary:</label>
          <input v-model="newEmployee.salary" type="number" step="1000" required />

          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-secondary" @click="closeAddModal">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Update Employee Modal -->
    <div v-if="showUpdateModal" class="modal">
      <div class="modal-content">
        <h2>Update Employee</h2>
        <form @submit.prevent="updateEmployee">
          <label>Name:</label>
          <input v-model="currentEmployee.name" type="text" required />

          <label>Date of Birth:</label>
          <input v-model="currentEmployee.dob" type="date" required />

          <label>Gender:</label>
          <select v-model="currentEmployee.gender" required>
            <option value="Nam">Male</option>
            <option value="Nữ">Female</option>
          </select>

          <label>Salary:</label>
          <input v-model="currentEmployee.salary" type="number" step="1000" required />

          <button type="submit" class="btn btn-primary">Update</button>
<button type="button" class="btn btn-secondary" @click="closeUpdateModal">Cancel</button>
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
      employees: [], // List of employees
      showAddModal: false, // Controls visibility of the Add modal
      showUpdateModal: false, // Controls visibility of the Update modal
      newEmployee: {
        name: '',
        dob: '',
        gender: 'Nam',
        salary: 0,
      }, // New employee data
      currentEmployee: {
        id: null,
        name: '',
        dob: '',
        gender: 'Nam',
        salary: 0,
      }, // Data of the employee being updated
      currentEmployeeIndex: null, // Index of the employee being updated
    };
  },
  mounted() {
    this.fetchEmployees(); // Fetch employee data from server when the component is mounted
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get('http://localhost:8080/employees');
        this.employees = response.data;
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
      this.resetNewEmployee();
    },
    resetNewEmployee() {
      this.newEmployee = {
        name: '',
        dob: '',
        gender: 'Nam',
        salary: 0,
      };
    },
    addNewEmployee() {
      // Add a new employee to the list
      this.employees.push({ ...this.newEmployee });
      this.closeAddModal();
    },
    openUpdateModal(employee, index) {
      // Open the update modal and populate it with the selected employee data
      this.showUpdateModal = true;
      this.currentEmployee = { ...employee }; // Set the data of the employee being updated
      this.currentEmployeeIndex = index; // Store the index of the employee being updated
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.resetCurrentEmployee();
    },
    resetCurrentEmployee() {
      this.currentEmployee = {
        id: null,
        name: '',
        dob: '',
        gender: 'Nam',
        salary: 0,
      };
      this.currentEmployeeIndex = null;
    },
    updateEmployee() {
      // Update the employee data in the list
      if (this.currentEmployeeIndex !== null) {
        this.$set(this.employees, this.currentEmployeeIndex, this.currentEmployee);
        this.closeUpdateModal();
      }
    },
    deleteEmployee(index) {
      if (confirm(`Are you sure you want to delete employee: ${this.employees[index].name}?`)) {
        this.employees.splice(index, 1);
      }
    },
    viewDetails(index) {
      alert(`Employee details: ${this.employees[index].name}`);
    },
    formatCurrency(value) {
      return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
}
.employee-table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.employee-table th, .employee-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  font-size: 16px;
}
.employee-table th {
  background-color: #f2f2f2;
  font-size: 18px;
}
button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}
.btn-success {
  margin-bottom: 20px;
  color: white;
  background-color: green;
  padding: 10px 20px;
  font-size: 16px;
}
.btn-primary {
  color: white;
  background-color: blue;
}
.btn-danger {
  color: white;
  background-color: red;
}
.btn-info {
  color: white;
  background-color: #17a2b8;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 50%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.modal-content h2 {
  margin-top: 0;
  text-align: center;
}
.modal-content form {
  display: flex;
  flex-direction: column;
}
.modal-content label {
  margin: 10px 0 5px;
  font-size: 16px;
}
.modal-content input, .modal-content select {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}
.modal-content button {
  margin-top: 15px;
  padding: 10px;
  font-size: 16px;
}
.btn-secondary {
  background-color: gray;
  color: white;
}
</style>
