import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true,
    },
    drawName: {
        type: String,
        required: true,
        unique: true,
    },
    drawType: {
        type: String,
        required: true,
    },
    users: {
        type: [String],
        default: [],
    },
    numbers: {
        type: [Number],
        default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    },
    winningNumbers: {
        type: [Number],
        default: [],
    },
    toSelect: {
        type: Number,
        default: 8,
    },
    createddate: {
        type: Date,
        default: Date.now(),
    },
    enddate: {
        type: Date,
        required: true,
    },
    });

const Draw = mongoose.models.Draw || mongoose.model("Draw", drawSchema);

export default Draw;