const Admin = require('../models/Admin');

/**
 * Create a new admin
 * @param {Object} req - Request object containing admin details
 * @param {Object} res - Response object
 */
const createAdmin = async (req, res) => {
    try {
        const { name, email, phone, password, assignedConstituencies } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: "All required fields (name, email, phone, password) must be provided." });
        }

        const newAdmin = new Admin({
            name,
            email,
            phone,
            password,
            assignedConstituencies: assignedConstituencies || [],
        });

        await newAdmin.save();

        res.status(201).json({ message: "Admin created successfully.", admin: newAdmin });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

/**
 * Delete an admin by ID
 * @param {Object} req - Request object containing admin ID
 * @param {Object} res - Response object
 */
const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.body;

        // Validate input
        if (!adminId) {
            return res.status(400).json({ error: "Admin ID is required." });
        }

        const deletedAdmin = await Admin.findByIdAndDelete(adminId);

        if (!deletedAdmin) {
            return res.status(404).json({ error: "Admin not found." });
        }

        res.status(200).json({ message: "Admin deleted successfully.", admin: deletedAdmin });
    } catch (error) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

/**
 * Update admin details
 * @param {Object} req - Request object containing admin ID and fields to update
 * @param {Object} res - Response object
 */
const updateAdmin = async (req, res) => {
    try {
        const { adminId, ...updates } = req.body;

        // Validate input
        if (!adminId) {
            return res.status(400).json({ error: "Admin ID is required." });
        }

        // Only update provided fields
        const allowedFields = ['name', 'email', 'phone', 'password', 'assignedConstituencies', 'isActive'];
        const validUpdates = Object.keys(updates).reduce((acc, key) => {
            if (allowedFields.includes(key)) {
                acc[key] = updates[key];
            }
            return acc;
        }, {});

        if (Object.keys(validUpdates).length === 0) {
            return res.status(400).json({ error: "No valid fields provided for update." });
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, validUpdates, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ error: "Admin not found." });
        }

        res.status(200).json({ message: "Admin updated successfully.", admin: updatedAdmin });
    } catch (error) {
        console.error("Error updating admin:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    createAdmin,
    deleteAdmin,
    updateAdmin,
};
