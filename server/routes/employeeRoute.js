const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

// Use the upload middleware for the createEmployee route
router.post('/create', createEmployee);

router.get('/list', getEmployees);
router.put('/update/:id', updateEmployee);
router.delete('/delete/:id', deleteEmployee);

router.get('/', (req, res) => {
    res.send('Employee route is working!');
});

module.exports = router;