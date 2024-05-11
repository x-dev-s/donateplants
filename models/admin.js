import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    verifiedUsers: {
        type: Number,
        default: 0,
    },
    drawsBought: {
        type: Number,
        default: 0,
    },
    donationsCount: {
        type: Number,
        default: 0,
    },
    totalDonations: {
        type: Number,
        default: 0,
    },
    notifications: [
        {
            context: String,
            message: String,
            date: {
                type: Date,
                default: new Date().toISOString(),
            },
            read: {
                type: Boolean,
                default: false,
            },
        },
    ],
    unreadNotifications: {
        type: Number,
        default: 0,
    },
});

const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema);

export default Admin;