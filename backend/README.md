//Install dependency
npm i bcrypt body-parser cors dotenv email-validator express express-session expression jsonwebtoken multer nodemailer pg soap express-rate-limit


//Command to Generate Bcrypt Hash in the Terminal
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"


//Generate a Random JWT Secret Key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"


//.env
PORT=3000
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=auth_db
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
AMADEUS_API_KEY=ncauX2GvGKjPAoaGi0ns8wj73Y8j3gbo
AMADEUS_API_SECRET=1UG5NDT4bzF0T8NM


// CREATE DATABASE plant-app-DB;

SELECT * FROM public.super_admins
ORDER BY id ASC 

CREATE SEQUENCE public.super_admins_id_seq;

CREATE TABLE public.super_admins (
    id INTEGER NOT NULL DEFAULT nextval('public.super_admins_id_seq'::regclass),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'super_admin',
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT super_admins_pkey PRIMARY KEY (id),
    CONSTRAINT super_admins_email_key UNIQUE (email)
);


INSERT INTO public.super_admins (name, email, password)
VALUES 
('Admin One', 'admin1@example.com', 'hashed_password_here');


-----------------------------------------

SELECT * FROM public.admins

CREATE SEQUENCE public.admins_id_seq;

CREATE TABLE public.admins (
    id INTEGER NOT NULL DEFAULT nextval('public.admins_id_seq'::regclass),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    permissions JSONB DEFAULT '[]',
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT admins_pkey PRIMARY KEY (id),
    CONSTRAINT admins_email_key UNIQUE (email)
);



----------------------------------------------

SELECT * FROM public.vendor_profiles

CREATE TABLE public.vendor_profiles (
 id INTEGER NOT NULL DEFAULT nextval('public.vendors_id_seq'::regclass),
 admin_id INTEGER,
 name VARCHAR(255) NOT NULL,
 company_name VARCHAR(255) NOT NULL,
 company_type VARCHAR(10) NOT NULL,
 gstin VARCHAR(20) NOT NULL,
 contact_number VARCHAR(15) NOT NULL,
 email VARCHAR(255) NOT NULL,
 password TEXT NOT NULL,
 address TEXT NOT NULL,
 pincode VARCHAR(10) NOT NULL,
 role VARCHAR(20) NOT NULL DEFAULT 'vendor',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT NOW(),
 password_changed BOOLEAN DEFAULT false,
 CONSTRAINT vendor_profiles_company_type_check CHECK (
 company_type = ANY (ARRAY['LLP', 'PVT', 'OPC', 'PROP', 'OTHER'])
 ),
 CONSTRAINT vendor_profiles_role_check CHECK (
 role = ANY (ARRAY['vendor', 'company'])
 ),
 CONSTRAINT vendor_profiles_email_key UNIQUE (email),
 CONSTRAINT vendor_profiles_gstin_key UNIQUE (gstin),
 CONSTRAINT vendor_profiles_pkey PRIMARY KEY (id),
 CONSTRAINT vendor_profiles_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(id) ON
DELETE CASCADE
);

ALTER TABLE public.vendor_profiles
DROP CONSTRAINT vendor_profiles_role_check;

ALTER TABLE public.vendor_profiles
ADD CONSTRAINT vendor_profiles_role_check CHECK (
  role = ANY (ARRAY['vendor', 'company', 'service'])
);
ALTER TABLE vendor_profiles ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE vendor_profiles ADD COLUMN deactivation_status BOOLEAN DEFAULT FALSE;

----------------------------------------------------------------

SELECT * FROM public.otps

CREATE TABLE otps ( 
id SERIAL PRIMARY KEY, 
user_id INTEGER NOT NULL, 
user_type TEXT NOT NULL, 
otp TEXT NOT NULL, 
expires_at TIMESTAMP NOT NULL, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
UNIQUE(user_id, user_type), 
CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES vendor_profiles(id) ON 
DELETE CASCADE 
); 


------------------------------------------------------------------

SELECT * FROM public.users

CREATE TABLE users ( 
id SERIAL PRIMARY KEY, 
username VARCHAR(50) UNIQUE NOT NULL, 
email VARCHAR(100) UNIQUE NOT NULL, 
password VARCHAR(100) NOT NULL, 
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

--------------------------------------------------------------------

SELECT * FROM public.categories

CREATE TABLE categories ( 
id SERIAL PRIMARY KEY, 
name_en VARCHAR(100) NOT NULL, 
name_hi VARCHAR(100), 
name_mr VARCHAR(100), 
slug VARCHAR(100) UNIQUE NOT NULL, 
description TEXT, 
sort_order INTEGER DEFAULT 0, 
is_active BOOLEAN DEFAULT TRUE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO categories (name_en, name_hi, name_mr, slug, description, sort_order, is_active)
VALUES 
  ('Fertilizers', 'उर्वरक', 'खते', 'fertilizers', 'Soil and plant nutrient enhancers', 1, TRUE),
  ('Pesticides', 'कीटनाशक', 'कीटकनाशके', 'pesticides', 'Pest control chemicals for crops', 2, TRUE),
  ('Seeds', 'बीज', 'बियाणे', 'seeds', 'High quality and hybrid seeds', 3, TRUE),
  ('Tools & Equipment', 'उपकरण', 'साधने व उपकरणे', 'tools-equipment', 'Farming tools and accessories', 4, TRUE),
  ('Irrigation', 'सिंचाई', 'सिंचन', 'irrigation', 'Watering solutions for agriculture', 5, TRUE);


---------------------------------------------------------------------

SELECT * FROM public.sub_categories

CREATE TABLE sub_categories ( 
id SERIAL PRIMARY KEY, 
category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE, 
name_en VARCHAR(100) NOT NULL, 
name_hi VARCHAR(100), 
name_mr VARCHAR(100), 
slug VARCHAR(100) NOT NULL, 
description TEXT, 
icon_url VARCHAR(500), 
sort_order INTEGER DEFAULT 0, 
is_active BOOLEAN DEFAULT TRUE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
UNIQUE(category_id, slug) 
);


-- Fertilizers (category_id = 1)
INSERT INTO sub_categories (category_id, name_en, name_hi, name_mr, slug, description, icon_url, sort_order, is_active)
VALUES 
(1, 'Nitrogen Fertilizers', 'नाइट्रोजन उर्वरक', 'नायट्रोजन खत', 'nitrogen-fertilizers', 'Helps in leaf growth', '', 1, TRUE),
(1, 'Phosphorus Fertilizers', 'फॉस्फरस उर्वरक', 'फॉस्फरस खत', 'phosphorus-fertilizers', 'Encourages root development', '', 2, TRUE),
(1, 'Organic Fertilizers', 'जैविक उर्वरक', 'सेंद्रिय खत', 'organic-fertilizers', 'Natural soil enhancers', '', 3, TRUE);

-- Pesticides (category_id = 2)
INSERT INTO sub_categories (category_id, name_en, name_hi, name_mr, slug, description, icon_url, sort_order, is_active)
VALUES 
(2, 'Insecticides', 'कीटकनाशक', 'कीटकनाशके', 'insecticides', 'Kills insects damaging crops', '', 1, TRUE),
(2, 'Fungicides', 'फफूंदनाशक', 'बुरशीनाशक', 'fungicides', 'Used to prevent fungal infections', '', 2, TRUE),
(2, 'Herbicides', 'शाकनाशक', 'गवतनाशक', 'herbicides', 'Weed control chemicals', '', 3, TRUE);

-- Seeds (category_id = 3)
INSERT INTO sub_categories (category_id, name_en, name_hi, name_mr, slug, description, icon_url, sort_order, is_active)
VALUES 
(3, 'Vegetable Seeds', 'सब्ज़ियों के बीज', 'भाजीपाला बियाणे', 'vegetable-seeds', 'Seeds for vegetables like tomato, chili, etc.', '', 1, TRUE),
(3, 'Fruit Seeds', 'फल के बीज', 'फळांची बियाणे', 'fruit-seeds', 'Mango, guava, etc.', '', 2, TRUE),
(3, 'Field Crop Seeds', 'खेत की फसल के बीज', 'शेती पीक बियाणे', 'field-crop-seeds', 'Wheat, paddy, etc.', '', 3, TRUE);

-- Tools & Equipment (category_id = 4)
INSERT INTO sub_categories (category_id, name_en, name_hi, name_mr, slug, description, icon_url, sort_order, is_active)
VALUES 
(4, 'Hand Tools', 'हाथ उपकरण', 'हात साधने', 'hand-tools', 'Spades, sickles, hoes', '', 1, TRUE),
(4, 'Sprayers', 'छिड़काव यंत्र', 'फवारणी उपकरणे', 'sprayers', 'Manual and motorized sprayers', '', 2, TRUE),
(4, 'Harvesting Tools', 'कटाई उपकरण', 'कापणी उपकरणे', 'harvesting-tools', 'Reapers, cutters', '', 3, TRUE);

-- Irrigation (category_id = 5)
INSERT INTO sub_categories (category_id, name_en, name_hi, name_mr, slug, description, icon_url, sort_order, is_active)
VALUES 
(5, 'Drip Irrigation', 'ड्रिप सिंचाई', 'ठिबक सिंचन', 'drip-irrigation', 'Water-saving irrigation system', '', 1, TRUE),
(5, 'Sprinkler Systems', 'स्प्रिंकलर प्रणाली', 'स्प्रिंकलर प्रणाली', 'sprinkler-systems', 'Overhead water distribution', '', 2, TRUE),
(5, 'Irrigation Pipes', 'सिंचाई पाइप', 'सिंचन पाईप', 'irrigation-pipes', 'Used to transport water', '', 3, TRUE);

----------------------------------------------------------------------

SELECT * FROM public.products

CREATE TABLE products ( 
id SERIAL PRIMARY KEY, 
vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE CASCADE, 
category_id INTEGER NOT NULL REFERENCES categories(id), 
sub_category_id INTEGER REFERENCES sub_categories(id), 
name_en VARCHAR(200) NOT NULL, 
name_hi VARCHAR(200), 
name_mr VARCHAR(200), 
description TEXT, 
technical_name VARCHAR(200), 
brand VARCHAR(100), 
manufacturer VARCHAR(150), 
mrp DECIMAL(10, 2) NOT NULL, 
selling_price DECIMAL(10, 2) NOT NULL, 
discount_percentage DECIMAL(5, 2) GENERATED ALWAYS AS  
(CASE WHEN mrp > 0 THEN ((mrp - selling_price) * 100 / mrp) ELSE 0 END) 
STORED, 
pack_size VARCHAR(50) NOT NULL, 
pack_type VARCHAR(50), 
unit_per_pack INTEGER DEFAULT 1, 
sku VARCHAR(100) UNIQUE, 
stock_quantity INTEGER DEFAULT 0, 
minimum_order_quantity INTEGER DEFAULT 1, 
recommended_crops INTEGER[] DEFAULT '{}', 
primary_image_url VARCHAR(500), 
images JSONB, 
video_url VARCHAR(500), 
rating_average DECIMAL(3, 2) DEFAULT 0, 
rating_count INTEGER DEFAULT 0, 
review_count INTEGER DEFAULT 0, 
status VARCHAR(20) DEFAULT 'active', 
is_prescription_required BOOLEAN DEFAULT FALSE, 
is_banned BOOLEAN DEFAULT FALSE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

----------------------------------------------------------------------





Login (Existing User):
Method: POST
URL: http://localhost:3000/api/user/login
Body (JSON):

{
  "phone": "1234567890"
}

Response (if phone exists in DB):
{
  "status": "otp_sent",
  "message": "OTP sent to phone",
  "phone": "1234567890"
}

Response (if phone doesn’t exist):

{
  "status": "register",
  "message": "Phone not found, please register",
  "phone": "1234567890"
}

Register (New User):
Method: POST
URL: http://localhost:3000/api/user/register
Body (JSON):
{
  "name": "Pratiksha",
  "email": "pratikshabhise87@gmail.com"
}
Response:
json

Collapse

Wrap

Copy
{
  "status": "otp_sent",
  "message": "OTP sent to email",
  "email": "pratikshabhise87@gmail.com"
}

Verify OTP (After Login):
Method: POST
URL: http://localhost:3000/api/user/verify-otp
Body (JSON):
{
  "phone": "1234567890",
  "otp": "123456" // Replace with actual OTP from console
}
Response:
{
  "status": "verified",
  "message": "OTP verified successfully",
  "phone": "1234567890",
  "email": "pratikshabhise87@gmail.com",
  "session_id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Verify OTP (After Register):
Method: POST
URL: http://localhost:3000/api/user/verify-otp
Body (JSON):
{
  "email": "pratikshabhise87@gmail.com",
  "otp": "123456" // Replace with actual OTP from email
}
Response:
{
  "status": "verified",
  "message": "OTP verified successfully",
  "phone": "",
  "email": "pratikshabhise87@gmail.com",
  "session_id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


Logout:
Method: POST
URL: http://localhost:3000/api/user/logout
Headers: Authorization: Bearer <session_id>
Response:
{
  "status": "success",
  "message": "Logged out successfully"
}






