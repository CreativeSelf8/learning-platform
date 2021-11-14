const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const requestUser = {
  body: Joi.object().keys({
    name: Joi.string(),
    phone: Joi.number(),
    birth: Joi.string(),
    address: Joi.string(),
    class: Joi.string(),
    supportDesc: Joi.string(),
  }),
};

const acceptRequest = {
  body: Joi.object().keys({
    name: Joi.string(),
    phone: Joi.number(),
    password: Joi.string().required().custom(password),
    requestId: Joi.string().custom(objectId),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const changePassword = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      oldPassword: Joi.string().custom(password),
      newPassword: Joi.string().custom(password),
    })
    .min(1),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  requestUser,
  acceptRequest
};
