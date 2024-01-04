import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    phone: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    isOnline: {
        type: 'string',
        default: '0'
    }

},
    { timestamp: true, }
)

const User = mongoose.model("User", userSchema);
export default User;