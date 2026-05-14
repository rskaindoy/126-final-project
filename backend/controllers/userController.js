//HANDLES THE FFUNCTIONS IN USER


//IMPORTS
const db = require('../src/config/db'); //connect db
//import third-party mod
const bcrypt = require('bcrypt'); //for hashing pw
const validator = require('validator');

const num_of_hashing = 10; //performs 2^10 hashing, slower to decrypt later = lesser being hacked


// signup
exports.signup = async (req, res) => {
    let { username, email, password } = req.body;

    // check if fields are empty
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        //-------- VERIFY VALIDITY OF EMAIL
        email = validator.normalizeEmail(email);     //lowercase and remove unnecessary space
        //check email format
        if (!validator.isEmail(email)) {
                return res.status(400).json({ message: "Invalid email. Enter a valid email address" });
        }
        //check if email exist in db
        const [existing_email] = await db.query(
            'SELECT * FROM user WHERE email = ?', [email]
        );
        if (existing_email.length > 0) {
            return res.status(400).json({ message: "Email already taken" });
        }

        //--- VERIFY VALIDITY OF PASSWORD
        // requirements for pw
        const isStrongPassword = validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            returnScore: false
        });

        if(!isStrongPassword){
            return res.status(400).json({
                message: 
                    "Password must have:\nMinimum length: 8 characters\nMinimum lowercase: 1\nMinimum uppercase: 1\nMinimum number: 1"
            })
        }

 


        // -------- ALLOW REGISTER; INSERT THE EMAIL AND PW ONLY IF ALL VERIFICATIONS PASSED

        const hashedPassword = await bcrypt.hash(password, num_of_hashing); //hash password
        //insert to query
        await db.query(
            'INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword] 
        );
        // redirect back to login when registered successfully
        return res.redirect('/login.html');

    }catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

//LOGIN
exports.login = async (req, res) => {
    let { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        email= validator.normalizeEmail(email);        //lowercase and remove unnecessary space

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email. Enter a valid email address" });
        }
        //check if email was saved
        const [existing] = await db.query(
            'SELECT * FROM user WHERE email = ?', [email]
        );
        if (existing.length === 0) {
            return res.status(400).json({ message: "Email not found"});
        }

        //if email was found
        const user = existing[0]; 
        //check if pw match from registered one 
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        return res.redirect('/home.html');

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
