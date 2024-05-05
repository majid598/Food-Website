import mongoose from "mongoose";

const dbConnect = async (uri) => {
  await mongoose
    .connect(uri, { dbName: "Food-Website" })
    .then((data) => console.log(`Db Connected to :${data.connection.host}`))
    .catch((err) => console.log(`Error Connecting to Db:${err}`));
};

export default dbConnect