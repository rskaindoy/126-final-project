//DESCRIPTION: handles all logic in sponsorship

const db = require('../src/config/db');

exports.submitSponsorship = async (req, res) => {
    try {
        const { 
            sponsor_type, 
            entity_name, 
            repr_name, 
            contact_number, 
            fb_link_1, 
            fb_link_2, 
            target_pet, 
            sponsorship_month, 
            amount 
        } = req.body;
        //
        const proof_img = req.file ? req.file.filename : null;

        //status: default lng
        const sql = `
            INSERT INTO sponsorship (
                user_id, sponsor_type, entity_name, repr_name, 
                contact_number, fb_link_1, fb_link_2, 
                animal_id, target_month, amount, proof_img
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


        await db.query(sql, [
            req.session.userId,
            sponsor_type,
            entity_name || null, 
            repr_name || null,
            contact_number,
            fb_link_1,
            fb_link_2 || null,
            target_pet, 
            sponsorship_month,
            amount,
            proof_img
        ]);

        res.status(201).send("Sponsorship submitted successfully!");

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Server Error");
    }
};