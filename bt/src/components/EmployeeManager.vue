<template>
    <div>
      <h2>Danh sách Nhân viên</h2>
      <button @click="isAdding = true">Thêm nhân viên mới</button>
  
      <input
        v-model="searchText"
        placeholder="Tìm kiếm theo email"
        @input="filterEmployees"
      />
  
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in filteredEmployeeList" :key="employee.id">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.dob }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.address }}</td>
            <td>
              <span :class="{ active: employee.status, inactive: !employee.status }">
                {{ employee.status ? "Đang hoạt động" : "Ngừng hoạt động" }}
              </span>
            </td>
            <td>
              <button @click="toggleEmployeeStatus(employee)">
                {{ employee.status ? "Chặn" : "Bỏ chặn" }}
              </button>
              <button @click="startEditing(employee)">Sửa</button>
              <button @click="removeEmployee(employee.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="isAdding || isEditing">
        <h3>{{ isAdding ? "Thêm nhân viên mới" : "Chỉnh sửa nhân viên" }}</h3>
        <form @submit.prevent="saveEmployee">
          <input v-model="employeeDetails.name" placeholder="Họ và tên" required />
          <input
            v-model="employeeDetails.dob"
            type="date"
            placeholder="Ngày sinh"
            required
          />
          <input
            v-model="employeeDetails.email"
            type="email"
            placeholder="Email"
            required
          />
          <input v-model="employeeDetails.address" placeholder="Địa chỉ" required />
          <button type="submit">{{ isAdding ? "Thêm" : "Lưu" }}</button>
          <button @click="cancelEdit">Hủy</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  
  const store = useStore();
  
  const searchText = ref("");
  const isAdding = ref(false);
  const isEditing = ref(false);
  const employeeDetails = ref({
    name: "",
    dob: "",
    email: "",
    address: "",
    status: true,
  });
  const editingEmployeeId = ref(null);
  
  const filteredEmployeeList = computed(() =>
    store.getters.filteredEmployees(searchText.value)
  );
  
  const loadEmployees = async () => {
    await store.dispatch("fetchEmployees");
  };
  
  const saveEmployee = async () => {
    if (isAdding.value) {
      await store.dispatch("addEmployee", employeeDetails.value);
    } else {
      await store.dispatch("updateEmployee", {
        ...employeeDetails.value,
        id: editingEmployeeId.value,
      });
    }
    resetForm();
  };
  
  const startEditing = (employee) => {
    editingEmployeeId.value = employee.id;
    employeeDetails.value = { ...employee };
    isEditing.value = true;
    isAdding.value = false;
  };
  
  const removeEmployee = async (employeeId) => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      await store.dispatch("deleteEmployee", employeeId);
    }
  };
  
  const toggleEmployeeStatus = async (employee) => {
    await store.dispatch("updateEmployee", {
      ...employee,
      status: !employee.status,
    });
  };
  
  const resetForm = () => {
    employeeDetails.value = {
      name: "",
      dob: "",
      email: "",
      address: "",
      status: true,
    };
    isAdding.value = false;
    isEditing.value = false;
    editingEmployeeId.value = null;
  };
  
  const cancelEdit = () => {
    resetForm();
  };
  
  onMounted(() => {
    loadEmployees();
  });
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
  }
  th {
    background-color: #f7f7f7;
    text-align: left;
  }
  button {
    margin-right: 5px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.8;
  }
  .active {
    color: green;
  }
  .inactive {
    color: red;
  }
  </style>
  