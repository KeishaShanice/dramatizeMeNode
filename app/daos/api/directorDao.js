const connection = require('../../config/dbconfig');

const directorDao = {
    table: 'director_table',
    findById: (res, id) => {
        connection.execute(
            'SELECT * FROM director_table WHERE id = ?',
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
    create: (req, res) => {
        if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create."
            });
        } else if(!req.body.title) {
            res.json({
                "error": true,
                "message": "Can't create record without 'title'."
            });
        } else {
            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            
            connection.execute(
                `INSERT INTO director_table SET ${fields.join(' = ?, ')} = ?`,
                values,
                (error, dbres) => {
                    if (!error) {
                        res.send(`Last id: ${dbres.insertId}`);
                    } else {
                        console.log('DAO Error', error);
                        res.send('Error creating record.');
                    }
                }
            );
        }
    },
    update: (req, res) => {
        if (isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number."
            });
        } else if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to update."
            });
        } else {
            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            
            connection.execute(
                `UPDATE director_table SET ${fields.join(' = ?, ')} = ? WHERE director_table = ?`,
                [...values, req.params.id],
                (error, dbres) => {
                    if(!error) {
                        res.send(`Changed ${dbres.changedRows} row(s)`);
                    } else {
                        console.log('DAO Error', error);
                        res.send('Error updating record.');
                    }
                }
            );
        }
    }
}

module.exports = directorDao;