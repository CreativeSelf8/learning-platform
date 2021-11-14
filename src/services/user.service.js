const httpStatus = require('http-status');
const { User, UserRequest } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isPhoneTaken(userBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  userBody.role = 'user';
  return User.create(userBody);
};

const requestUser = async (userBody) => {
  if (await User.isPhoneTaken(userBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  await UserRequest.deleteMany({phone: userBody.phone});
  return UserRequest.create(userBody);
};

const acceptRequest = async (body) => {
  if (await User.isPhoneTaken(body.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  await UserRequest.deleteOne({_id: body.requestId});
  const user = Object.assign(user, body);
  user.role = 'user';
  return UserRequest.create(user);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const getListRequest = async (filter, options) => {
  const requests = await UserRequest.paginate(filter, options);
  return requests;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by phone
 * @param {string} phone
 * @returns {Promise<User>}
 */
const getUserByPhone = async (phone) => {
  return User.findOne({ phone });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.phone && (await User.isPhoneTaken(updateBody.phone, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const changePassword = async (oldPassword, newPassword, userId) => {
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error();
    }
    if (user.role !== 'admin') {
      let passwordMatch = await user.isPasswordMatch(oldPassword);
      if (!passwordMatch) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Old password not match');
      }
    }

    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByPhone,
  updateUserById,
  deleteUserById,
  changePassword,
  requestUser,
  acceptRequest,
  getListRequest
};
