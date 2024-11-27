const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

// Use the upload middleware for the createEmployee route
router.post('/create', createEmployee);
router.get('/list', getEmployees);
router.get('/:id', getEmployeeById); // This line is crucial for fetching employee by ID
router.put('/update/:id', updateEmployee);
router.delete('/delete/:id', deleteEmployee);

router.get('/', (req, res) => {
    res.send('Employee route is working!');
});

module.exports = router;