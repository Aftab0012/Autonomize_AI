const { default: axios } = require('axios');
const User = require('../models/userModel.js');
const Follow = require('../models/friendsModel.js');
// const userValSchema = require('../validations/userValidations.js');

const getUser = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    if (typeof username !== 'string') {
      return res.status(400).json({ error: 'Username must be a string.' });
    }

    let user = await User.findOne({ username }).populate('mutuals');

    if (!user) {
      const githubResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const githubData = githubResponse.data;

      user = new User({
        username: githubData.login,
        location: githubData.location,
        blog: githubData.blog,
        bio: githubData.bio,
        gists_url: githubData.gists_url,
        repos_url: githubData.repos_url,
        followers: githubData.followers,
        following: githubData.following,
      });

      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchUser = async (req, res) => {
  const query = req.query.q;

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { blog: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
      ],
    });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: 'User not found for given query' });
    }

    res.status(200).json({ message: 'Users found', users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndDelete({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate({ username }, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'No such user found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const sortByParams = async (req, res) => {
  const query = req.query.sortBy || 'repos_url';
  try {
    const users = await User.find()
      .sort({ [query]: -1 })
      .populate('mutuals');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleMutualFriends = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { following } = req.body;

    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({
      follower: user._id,
      following,
    });
    if (existingFollow) {
      return res.status(400).json({ message: 'Already following this user.' });
    }

    if (user._id !== following) {
      // Create a new follow relationship
      const follow = new Follow({ follower: user._id, following });
      await follow.save();

      // Update the user being followed
      await User.findByIdAndUpdate(following, {
        $addToSet: { mutuals: user._id },
      });

      return res
        .status(201)
        .json({ message: 'Follow relationship created successfully.', follow });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getUser,
  searchUser,
  deleteUser,
  updateUser,
  sortByParams,
  handleMutualFriends,
};
