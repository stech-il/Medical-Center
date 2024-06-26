const express = require("express");
const cors = require('cors');
const db = require('./database/db.js');
const createSocketServer =require('./services/SocketServer.js')

const HMOsRouter = require('./routes/HMOsRoutes.js');
const PatientsRouter = require('./routes/PatientsRoutes.js');
const UsersRouter = require('./routes/UserRoute.js');
const RolesRouter = require('./routes/RolesRoutes.js');
const MessagesRouter = require('./routes/MessagesRoutes.js')
const RoomRouter=require('./routes/RoomRoute.js')
const QueueRouter=require('./routes/QueueRoute.js')


const app = express();

app.use(cors());
app.use(express.json());
app.use("/HMOs", HMOsRouter);
app.use("/patients", PatientsRouter);
app.use("/users", UsersRouter);
app.use("/roles", RolesRouter);
app.use("/messages", MessagesRouter);
app.use("/rooms", RoomRouter);
app.use("/queues", QueueRouter);




(async () => {
    try {
        await db.authenticate();
        console.log('connected to DB');
    } catch (error) {
        console.log(`ERROR WHILE CONNECTING TO DB: ${error}`);
    }
})();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const server = createSocketServer(app);

server.listen(8000, () => {
  console.log('Server UP running in http://localhost:8000/');
});

// app.listen(8000, () => {
//     console.log('Server UP running in http://localhost:8000/');
// });
