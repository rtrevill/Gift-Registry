const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    host_user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    registries: {
        type: Schema.Types.ObjectId,
        ref: "Registry"
    }
});

const Invites = mongoose.model("Invites", inviteSchema);

module.exports = Invites;