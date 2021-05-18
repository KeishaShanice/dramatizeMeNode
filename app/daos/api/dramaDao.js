const connection = require('../../config/dbconfig');

const dramaDao = {
    table: 'dramas',
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
                `INSERT INTO dramas SET ${fields.join(' = ?, ')} = ?`,
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
                `UPDATE dramas SET ${fields.join(' = ?, ')} = ? WHERE dramas = ?`,
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

module.exports = dramaDao;