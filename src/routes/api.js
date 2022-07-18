const express = require('express');
const {Registration,login,profileUpdate}=require('../controllers/UsersController');
const {createTask,deleteTask,updateTaskStatus,listTaskByStatus,tasksStatusCount}=require('../controllers/TasksController');
const {AuthVerifyMiddleware}=require('../middlewears/AuthVerifyMiddleware');
const router=express.Router();



router.post('/registration',Registration);
router.post('/login',login);
router.post('/profileUpdate',AuthVerifyMiddleware,profileUpdate);

router.post('/createTask',AuthVerifyMiddleware,createTask);
router.get('/updateTaskStatus/:id/:status',AuthVerifyMiddleware,updateTaskStatus);
router.get('/listTaskByStatus/:status',AuthVerifyMiddleware,listTaskByStatus);
router.get('/tasksStatusCount',AuthVerifyMiddleware,tasksStatusCount);


module.exports =router;