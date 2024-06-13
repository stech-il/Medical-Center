import db from "../database/db.js";

import { DataTypes } from "sequelize";

const RoomModel = db.define("users", {
    name: {type: DataTypes.STRING},
})

export default RoomModel