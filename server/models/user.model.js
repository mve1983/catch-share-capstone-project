import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:  {
        type: String,
        required: true
      },
    realName: String,
    showRealName: Boolean,
    showCatches: Boolean,
    favouriteWeatherPlaces: [{townName: String, lat: Number, lng: Number}],
    img: {
      data: Buffer,
      contentType: String,
  }
})

const User = mongoose.model("User", userSchema);

export default User;