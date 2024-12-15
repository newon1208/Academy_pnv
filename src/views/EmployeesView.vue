<template>
  <div>
    <h1>List of Employees</h1>
    <!-- Search Form -->
    <div id="search-container">
      <h2>Tìm kiếm nhân viên</h2>
      <form @submit.prevent="searchEmployees">
        <div class="form-row">
          <div>
            <label for="name">Tên (Tìm kiếm gần đúng):</label>
            <input id="name" v-model="searchCriteria.name" type="text" />
          </div>
          <div>
            <label for="dob-from">Ngày sinh từ:</label>
            <input id="dob-from" v-model="searchCriteria.dobFrom" type="date" />
          </div>
          <div>
            <label for="dob-to">Ngày sinh đến:</label>
            <input id="dob-to" v-model="searchCriteria.dobTo" type="date" />
          </div>
        </div>
        <div class="form-row">
          <div>
            <label for="gender">Giới tính:</label>
            <select id="gender" v-model="searchCriteria.gender">
              <option value="">Tất cả</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>
          <div>
            <label for="salaryRange">Mức lương:</label>
            <select id="salaryRange" v-model="searchCriteria.salaryRange">
              <option value="">Tất cả</option>
              <option value="1-5">Dưới 5 triệu</option>
              <option value="5-10">Từ 5 - 10 triệu</option>
              <option value="10-20">Từ 10 - 20 triệu</option>
              <option value="gt20">Trên 20 triệu</option>
            </select>
          </div>
          <div>
            <label for="phone">Số điện thoại (Tìm kiếm gần đúng):</label>
            <input id="phone" v-model="searchCriteria.phone" type="text" />
          </div>
        </div>

        <label>Bộ phận:</label>
        <select v-model="searchCriteria.departmentId" :disabled="isViewMode" id="department">
          <option value="">Tất cả</option>
          <option v-for="department in departments" :key="department.id" :value="department.id">
            {{ department.name }}
          </option>
        </select><br />

        <div class="form-actions">
          <button type="button" class="btn-reset" @click="resetSearch">Đặt lại</button>
          <button @click="fetchEmployees()" class="btn-search">Tìm kiếm</button>
        </div>
      </form>
    </div>

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
      employees: [],
      showAddModal: false,
      showUpdateModal: false,
      searchCriteria: {
        name: '',
        dobFrom: '',
        dobTo: '',
        gender: '',
        salaryRange: '',
        phone: '',
        departmentId: '',
      },
      newEmployee: {
        name: '',
        dob: '',
        gender: 'Nam',
        salary: 0,
      },
      currentEmployee: {
        id: null,
        name: '',
        dob: '',
        gender: 'Nam',
        salary: 0,
      },
      currentEmployeeIndex: null,
      departments: [
        { id: 1, name: 'Sales' },
        { id: 2, name: 'HR' },
        { id: 3, name: 'IT' },
      ],
      isViewMode: false,
    };
  },
  mounted() {
    this.fetchEmployees();
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
    searchEmployees() {
      console.log('Searching with criteria:', this.searchCriteria);
      // Perform search with the provided criteria
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
      this.employees.push({ ...this.newEmployee });
      this.closeAddModal();
    },
    openUpdateModal(employee, index) {
      this.showUpdateModal = true;
      this.currentEmployee = { ...employee };
      this.currentEmployeeIndex = index;
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
      return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    },
    resetSearch() {
      this.searchCriteria = {
        name: '',
        dobFrom: '',
        dobTo: '',
        gender: '',
        salaryRange: '',
        phone: '',
        departmentId: '',
      };
    },
  },
};
</script>

<style scoped>
#search-container {
  padding: 10px;
  background-color: #f4f4f4;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-row div {
  margin-right: 20px;
}

.form-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.btn-reset, .btn-search {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-reset {
  background-color: #f44336;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.employee-table th, .employee-table td {
  padding: 8px;
  text-align: center;
}

.employee-table th {
  background-color: #4CAF50;
  color: white;
}

.employee-table td {
  background-color: #f9f9f9;
}

.btn {
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}
</style>
