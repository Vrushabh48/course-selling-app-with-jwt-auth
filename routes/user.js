const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken')
const JWT_SECRET = '123456';
const { User, Admin, Course } = require("../db");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    await User.create({
        username: username,
        password: password
    })

    res.json({
        msg: 'User created successfully'
    })

    
});

router.post('/signin',async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ 
        username, 
        password 
    });
    if (!user) {
        return res.status(401).json({
            message: 'Invalid username or password'
        });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

     res.json({
         courses: response
     })
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }

        // Assuming User model has a method to add purchased course
        await User.findByIdAndUpdate(userId, { $push: { purchasedCourses: courseId } });

        res.json({
            message: 'Course purchased successfully'
        });
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router