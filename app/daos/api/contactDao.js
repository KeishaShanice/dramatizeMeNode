const connection = require('../../config/dbconfig');

const contactDao = {
    table: 'contacts',
    create: (req, res) => {
        // Required Min Data
        if (!req.body.first_name || !req.body.last_name || !req.body.email) {
            res.json({
                "error": true,
                "message": "Missing Data"
            });
        }
        let fields = Object.keys(req.body);
        let values = Object.values(req.body);

        let sql = `INSERT INTO contacts (${fields.join(',')})
        VALUES (${Array(values.length).fill('?').join(',')})`;

        connection.execute(sql, values, (err, rows) => {
            if (err) {
                res.json({
                    "error": true,
                    "message": "No fields to create."
                });
            }
            if (rows.warning_count > 0) {
                connection.execute('SHOW warnings', (err, rows) => {
                    res.json(rows);
                })
            }
            res.json(rows);
        });

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
                `UPDATE contacts SET ${fields.join(' = ?, ')} = ? WHERE contacts = ?`,
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

module.exports = contactDao;