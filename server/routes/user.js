const express = require('express');
const User = require("../model/user.model")
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const searchQuery = req.query.search || ""; // Get the search query

  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * pageSize;

    // Modify the query to include search functionality
    const users = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } }
      ]
    })
      .skip(skip)
      .limit(pageSize);

    const totalCount = await User.countDocuments({
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } }
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
