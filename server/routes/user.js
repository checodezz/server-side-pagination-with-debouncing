const express = require('express');
const User = require("../model/user.model");
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const search = req.query.search || ""; // Get the search query

  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * pageSize;

    // Build the query for filtering based on the search term
    const users = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } }, // Search in username
        { email: { $regex: search, $options: "i" } }    // Search in email
      ]
    })
      .skip(skip)
      .limit(pageSize);

    // Get the total count of documents matching the search
    const totalCount = await User.countDocuments({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    });

    res.json({
      users,
      totalCount,                     // Total count for pagination
      totalPages: Math.ceil(totalCount / pageSize), // Calculate total pages
      currentPage: page               // The requested page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
