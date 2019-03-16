const services = require('../../common/js/services')

async function list(request) {
    const commentsServiceClient = services.getCommentsServiceClient();
    const call = commentsServiceClient.list(request);
    const comments = await new Promise((resolve, reject) => {
        const comments = []
        call.on('data', comment => {
            comments.push(comment);
        })
        call.on('end', () => {
            resolve(comments);
        });
        call.on('error', err => reject(err));
    })
    return comments ? comments : [];

}

async function get({ id }) {
    const commentsServiceClient = services.getCommentsServiceClient();
    const result = await new Promise((reslove, reject) => {
        commentsServiceClient.get({ id }, (err, res) => {
            if (err) reject(err)
            reslove(res);
        });
    })
    return result;
}

async function create(request) {
    const commentsServiceClient = services.getCommentsServiceClient();
    const result = await new Promise((reslove, reject) => {
        commentsServiceClient.create(request, (err, res) => {
            if (err) reject(err)
            reslove(res);
        });
    })
    return result;
}

module.exports = {
    list,
    get,
    create,
}