//DESCRIPTION: handles all logic in sponsorship

const db = require('../src/config/db');

exports.submitSponsorship = async (req, res) => {
    try {
        const { 
            sponsorType, 
            entityName, 
            contactNumber, 
            fbLink1, 
            fbLink2, 
            targetPet, 
            sponsorshipMonth, 
            amount 
        } = req.body;
        //
        if (!req.file) {
            return res.status(400).json({ message: "Proof of payment is required." });
        }
        const proof_img = req.file.filename;

        //put all pets selected in one string
        let collecPets = ""; 
        if (Array.isArray(targetPet)) {
            collecPets = targetPet.join(', '); 
        } else {
            collecPets = targetPet || ""; 
        }


        const sql = `
            INSERT INTO sponsorship (
                user_id, sponsor_type, entity_name, 
                contact_number, fb_link_1, fb_link_2, 
                target_pets, sponsorship_month, amount, proof_img
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(sql, [
            req.session.userId,              
            sponsorType,
            entityName || null,              
            contactNumber,
            fbLink1 || null,
            fbLink2 || null,
            collecPets,                   
            sponsorshipMonth,
            amount,
            proof_img
        ]);

        res.status(201).send("Sponsorship submitted successfully!");

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Server Error");
    }
};