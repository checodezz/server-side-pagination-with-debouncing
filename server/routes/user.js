const express = require('express');
const User = require("../model/user.model")
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;       
  const pageSize = parseInt(req.query.pageSize) || 10; 

  try {
    // to calculate the number of documents to skip
    const skip = (page - 1) * pageSize;

    const users = await User.find()  
      .skip(skip)                    
      .limit(pageSize);              

    const totalCount = await User.countDocuments();
    
    res.json({
      users,                        
      // totalPages: Math.ceil(totalCount / pageSize), 
      currentPage: page              
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
