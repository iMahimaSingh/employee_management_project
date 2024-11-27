const Employee = require('../models/Employee');


// Add a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course,image } = req.body;
   // create a employee instances
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image, // Store the Base64 string directly in the database
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error); // Log the error
    res.status(500).json({ message: 'Error adding employee', error });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};
// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};
// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};
