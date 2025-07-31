const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateOTP, sendOTP } = require("../services/emailService");
const nodemailer = require("nodemailer");

// exports.registerUser = async (req, res) => {
//   try {
//     const {
//       name,
//       company_name,
//       company_type,
//       gstin,
//       contact_number,
//       email,
//       password,
//       address,
//       pincode,
//       role = "service" // ✅ Default role if not passed
//     } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await pool.query(
//       `INSERT INTO vendor_profiles 
//       (name, company_name, company_type, gstin, contact_number, email, password, address, pincode, role, password_changed) 
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11) RETURNING *`,
//       [
//         name,
//         company_name,
//         company_type,
//         gstin,
//         contact_number,
//         email,
//         hashedPassword,
//         address,
//         pincode,
//         role,
//         true // ✅ password_changed set to true by default
//       ]
//     );

//     // ✅ Send confirmation email with plain password
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Welcome to Our Platform",
//       html: `
//         <h2>Welcome ${name}</h2>
//         <p>Your registration was successful.</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Password:</strong> ${password}</p>
//         <p>Please log in and change your password if necessary.</p>
//       `
//     });

//     return res.status(201).json({ message: "Registration successful. Credentials sent to email." });

//   } catch (error) {
//     console.error("Registration error:", error);
//     return res.status(500).json({ error: "Registration failed", details: error.message });
//   }
// };

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      company_name,
      company_type,
      gstin,
      contact_number,
      email,
      password,
      address,
      pincode,
      role = "service", // default role
      selectedServices // <-- Extract the selected service
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into vendor_profiles table
    const result = await pool.query(
      `INSERT INTO vendor_profiles 
        (name, company_name, company_type, gstin, contact_number, email, password, address, pincode, role, password_changed) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) 
      RETURNING id, name, email`,
      [
        name,
        company_name,
        company_type,
        gstin,
        contact_number,
        email,
        hashedPassword,
        address,
        pincode,
        role,
        true
      ]
    );

    const vendorId = result.rows[0].id;

    // Insert selected service as permission into vendor_permissions table
    await pool.query(
      `INSERT INTO vendor_permissions (vendor_id, permissions) 
       VALUES ($1, $2)`,
      [vendorId, JSON.stringify({ services: [selectedServices] })]
    );

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Platform",
      html: `
        <h2>Welcome ${name}</h2>
        <p>Your registration was successful.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please log in and change your password if necessary.</p>
      `
    });

    return res.status(201).json({ message: "Registration successful. Credentials sent to email." });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await pool.query(
//       `SELECT * FROM vendor_profiles WHERE email = $1`,
//       [email]
//     );

//     if (result.rowCount === 0) return res.status(401).json({ msg: "Email not found" });

//     const user = result.rows[0];

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ msg: "Invalid password" });

//     // Generate OTP
//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + 5 * 60000); // 5 min

//     // Upsert OTP
//     // await pool.query(
//     //   `INSERT INTO otps (user_id, user_type, otp, expires_at) 
//     //   VALUES ($1, $2, $3, $4)
//     //   ON CONFLICT (user_id, user_type)
//     //   DO UPDATE SET otp = $2, expires_at = $3, created_at = CURRENT_TIMESTAMP`,
//     //   [user.id, otp, expiresAt]
//     // );
//     await pool.query(
//       `INSERT INTO otps (user_id, user_type, otp, expires_at)
//        VALUES ($1, $2, $3, $4)
//        ON CONFLICT (user_id, user_type) DO UPDATE
//        SET otp = EXCLUDED.otp, expires_at = EXCLUDED.expires_at, created_at = NOW()`,
//       [user.id, user.role, otp, expiresAt]
//     );
//     // Send OTP email
//     await sendOTP(email, otp);

//     res.json({ msg: "OTP sent to email", user_id: user.id });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ msg: "Login failed" });
//   }
// };





// exports.verifyOTP = async (req, res) => {
//   const { user_id, user_type, otp } = req.body;

//   console.log("🔍 OTP Verification Request:", req.body);

//   try {
//     // 1. Check OTP
//     const otpResult = await pool.query(
//       `SELECT * FROM otps WHERE user_id = $1 AND user_type = $2 AND otp = $3 AND expires_at > NOW()`,
//       [user_id, user_type, otp]
//     );

//     if (otpResult.rows.length === 0) {
//       return res.status(400).json({ msg: "Invalid or expired OTP" });
//     }

//     // 2. Delete used OTP
//     await pool.query(`DELETE FROM otps WHERE user_id = $1 AND user_type = $2`, [user_id, user_type]);

//     // 3. Get permissions if service user
//     let permission = null;
//     if (user_type === 'service') {
//       const permRes = await pool.query(
//         `SELECT permissions FROM vendor_permissions WHERE vendor_id = $1`,
//         [user_id]
//       );
//       if (permRes.rows.length > 0) {
//         permission = permRes.rows[0].permissions;
//       }
//     }

//     // 4. Generate JWT
//     const token = jwt.sign(
//       {
//         user_id,
//         user_type,
//         permission
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({ msg: "OTP verified successfully", token, user_id, user_type, permission });
//   } catch (error) {
//     console.error("❌ Error in verifyOTP:", error);
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM vendor_profiles WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) return res.status(401).json({ msg: "Email not found" });

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Invalid password" });

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60000); // 5 min

    // Upsert OTP
    await pool.query(
      `INSERT INTO otps (user_id, user_type, otp, expires_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, user_type) DO UPDATE
       SET otp = EXCLUDED.otp, expires_at = EXCLUDED.expires_at, created_at = NOW()`,
      [user.id, user.role, otp, expiresAt]
    );

    // Send OTP email
    await sendOTP(email, otp);

    // Return user info needed for OTP verification
    res.json({ 
      msg: "OTP sent to email", 
      user_id: user.id,
      user_type: user.role, // Include user_type for frontend to store temporarily
      email: user.email // Optional: for frontend reference
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Login failed" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { user_id, user_type, otp } = req.body;

  console.log("🔍 OTP Verification Request:", req.body);

  try {
    // 1. Check OTP
    const otpResult = await pool.query(
      `SELECT * FROM otps WHERE user_id = $1 AND user_type = $2 AND otp = $3 AND expires_at > NOW()`,
      [user_id, user_type, otp]
    );

    if (otpResult.rows.length === 0) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // 2. Delete used OTP
    await pool.query(`DELETE FROM otps WHERE user_id = $1 AND user_type = $2`, [user_id, user_type]);

    // 3. Get user details and permissions
    const userResult = await pool.query(
      `SELECT * FROM vendor_profiles WHERE id = $1`,
      [user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = userResult.rows[0];

    // 4. Get permissions if service user
    let permissions = null;
    if (user_type === 'service') {
      const permRes = await pool.query(
        `SELECT permissions FROM vendor_permissions WHERE vendor_id = $1`,
        [user_id]
      );
      if (permRes.rows.length > 0) {
        permissions = permRes.rows[0].permissions;
      }
    }

    // 5. Generate JWT
    const token = jwt.sign(
      {
        user_id,
        user_type,
        permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Extended to 24h for better UX
    );

    // 6. Return complete user data for frontend storage
    res.status(200).json({ 
      msg: "Login successful",
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name || user.business_name, // Adjust based on your schema
          user_type,
          permissions
        }
      }
    });
  } catch (error) {
    console.error("❌ Error in verifyOTP:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};



exports.logoutUser = async (req, res) => {
  try {
    // On frontend, simply remove token from localStorage/sessionStorage
    res.status(200).json({ msg: "Logout successful. Please clear token on client side." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ msg: "Logout failed", error: error.message });
  }
};
 
exports.getMyPermissions = async (req, res) => {
  const vendorId = req.user.id;
  const result = await pool.query('SELECT permissions FROM vendor_permissions WHERE vendor_id = $1', [vendorId]);

  const permissionsJson = result.rows[0]?.permissions || {};
  const permissions = Object.keys(permissionsJson).filter(key => permissionsJson[key]);

  res.json({ permissions });
};
