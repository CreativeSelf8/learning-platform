const httpStatus = require('http-status');
const { News } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a news
 * @param {Object} newsBody
 * @returns {Promise<news>}
 */
const createNews = async (newsBody) => {
    return News.create(newsBody);
};

/**
 * Query for news
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNews = async (filter, options) => {
    const NewsData = await News.paginate(filter, options);
    return NewsData;
};

/**
 * Get News by id
 * @param {ObjectId} id
 * @returns {Promise<News>}
 */
const getNewsById = async (id) => {
    return News.findById(id);
};

/**
 * Update News by id
 * @param {ObjectId} NewsId
 * @param {Object} updateBody
 * @returns {Promise<News>}
 */
const updateNewsById = async (newsId, updateBody) => {
    const news = await getNewsById(newsId);
    if (!news) {
        throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
    }
    Object.assign(news, updateBody);
    await news.save();
    return news;
};

/**
 * Delete news by id
 * @param {ObjectId} newsId
 * @returns {Promise<News>}
 */
const deleteNewsById = async (newsId) => {
    const news = await getNewsById(newsId);
    if (!news) {
        throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
    }
    await news.remove();
    return news;
};

module.exports = {
    createNews,
    queryNews,
    updateNewsById,
    getNewsById,
    deleteNewsById,
};
