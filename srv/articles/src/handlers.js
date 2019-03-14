const logger = require('./utils/logger');
const { Article } = require('./models')

async function list({ query, paginator }) {
    return await new Promise((resolve, reject) => {
        Article.paginate(query, paginator, (err, result) => {
            if (err) reject(err)
            resolve({ articles: result.docs })
        })
    })
}

async function get({ id }) {
    return await new Promise((resolve, reject) => {
        Article.findOne({ _id: id }, (err, article) => {
            if (err) reject(err);
            resolve(article)
        })
    })
}


async function create(article) {
    const articleModel = new Article(article);
    return await new Promise((resolve, reject) => {
        articleModel.save((err, articleCreated) => {
            if (err) reject(err)
            resolve({ article: articleCreated })
        })
    })
}

async function update(article) {
    const query = { _id: article.id }
    delete article.id;
    await Article.findOneAndUpdate(query, article);
    const articleUpdated = await Article.findOne(query)
    return { article: articleUpdated };

}

async function remove({ id }) {
    try {
        const query = { _id: id }
        const article = await Article.findOne(query);
        article.remove();
        return {
            article,
            ok: true
        }
    } catch (error) {
        logger.error("Can not remove user, user not found")
        return {
            article: null,
            ok: false
        }
    }

}

module.exports = {
    list,
    get,
    create,
    update,
    remove
}

