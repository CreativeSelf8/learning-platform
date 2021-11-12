const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNews = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        thumbnail: Joi.string().required(),
        content: Joi.string().required()
    }),
};

const getNewsList = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getNews = {
    params: Joi.object().keys({
        newsId: Joi.string().custom(objectId),
    }),
};

const updateNews = {
    params: Joi.object().keys({
        newsId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            thumbnail: Joi.string().required(),
            content: Joi.string().required()
        })
        .min(1),
};

const deleteNews = {
    params: Joi.object().keys({
        newsId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createNews,
    getNewsList,
    getNews,
    updateNews,
    deleteNews,
};
