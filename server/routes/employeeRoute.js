const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

router.post('/employees', createEmployee);
router.get('/employees', getEmployees);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

router.get('/', (req, res) => {
    res.send('Employee route is working!');
});

module.exports = router;
