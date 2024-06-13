import db from "../database/db.js";

import { DataTypes } from "sequelize";

const RoomModel = db.define("rooms", {
    name: {type: DataTypes.STRING},
})

export default RoomModel