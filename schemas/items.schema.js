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
        health: {
            type:Number,
            required: true,
        },
        power:{
            type:Number,
            required: true,
        }
    },

});

export default mongoose.model('item', itemSchema);