import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    active: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        required: true,
    },
    });

const Package = mongoose.models.Package || mongoose.model("Package", packageSchema);

export default Package;