const Employee = require('../models/Employee');

// Add a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, image } = req.body;

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
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
