const express = require('express');
const User = require("../model/user.model")
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const search = req.query.search || "";

  try {
    const skip = (page - 1) * pageSize;

    const users = await User.find({
      $or: [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    })
      .skip(skip)  //sikp the first 10 || 20 docs based on user req
      .limit(pageSize);

    const totalCount = await User.countDocuments({
      $or: [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    });

    res.json({
      users,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
