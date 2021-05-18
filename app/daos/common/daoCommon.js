const connection = require('../../config/dbconfig');

const daoCommon = {
    findAll: (res, table) => {
        connection.execute(
            `SELECT * FROM ${table}`,
            (error, rows) => {
                if (!error) {
                    if (rows.length == 1) {
                        res.json(...rows);
                    } else {
                        res.json(rows);
                    }
                } else {
                    console.log('DAO Error', error);
                }
            });
    },
    findById: (res, table, id) => {
        connection.execute(
            `SELECT * FROM ${table} WHERE id = ?`,
            [id],
            (error, rows) => {
                if (!error) {
                    if (rows.length == 1) {
                        res.json(...rows);
                    } else {
                        res.json(rows);
                    }
                } else {
                    console.log('DAO Error', error);
                }
            });
    },
    countAll: (res, table) => {
        connection.execute(
            `SELECT COUNT(*) count FROM ${table}`,
            (error, rows) => {
                if (!error) {
                    if (rows.length == 1) {
                        res.json(...rows);
                    } else {
                        res.json(rows);
                    }
                } else {
                    console.log('DAO Error', error);
                }
            });
    }
}

module.exports = daoCommon;