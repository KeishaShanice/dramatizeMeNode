const daoCommon = require('./common/daoCommon');

const actorDao = {...daoCommon, ...require('./api/actorDao')}
const contactDao = {...daoCommon, ...require('./api/contactDao')}
const directorDao = {...daoCommon, ...require('./api/directorDao')}
const dramaDao = {...daoCommon, ...require('./api/dramaDao')}
const genreDao = {...daoCommon, ...require('./api/genreDao')}
const pageDao = {...daoCommon, ...require('./api/pageDao')}

module.exports = {
    actorDao,
    contactDao,
    directorDao,
    dramaDao,
    genreDao,
    pageDao
}