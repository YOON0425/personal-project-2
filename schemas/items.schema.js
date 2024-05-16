import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    item_code: {
        type:Number,
        required: true,
        unique: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    item_stat: {
        type: mongoose.Schema.Types.Mixed,
    },

});

export default mongoose.model('item', itemSchema);