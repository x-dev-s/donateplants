import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
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
            type: String,
            message: String,
            date: Date.now(),
            read: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;