import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}
        @cluster0.5cvzz.mongodb.net/myFirstDatabase?
        retryWrites=true&w=majority`

const connection = {};


const dbConnect = async () => {
    if(connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
} 

export default dbConnect;