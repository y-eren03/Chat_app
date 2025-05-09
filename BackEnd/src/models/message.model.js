import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },
        text: {
            type: String,

        },
        image: {
            type: String,
        },
        //ses gönderme ,arama ,görüntülü arama ve ekran paylaşımı eklenecek
    },
    {timestamps: true}
);

const Message = mongoose.model("Message", messageSchema);
export default Message;