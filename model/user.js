import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.addfile = function (filename, thumbnail, callback) {
  var user = new User({
    filename: filename,
    thumbnail: thumbnail,
  });
  user.save(callback);
};

userSchema.statics.getFiles = function (
  from_date,
  to_date,
  filename,
  perPage,
  page,
  callback
) {
  User.aggregate(
    [
      {
        $match: {
          $or: [
            {
              $and: [
                { createdAt: { $gte: new Date(from_date) } },
                { createdAt: { $lte: new Date(to_date) } },
              ],
            },
            { filename: filename },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $skip: parseInt(perPage) * parseInt(page) },
            { $limit: parseInt(perPage) },
          ],
        },
      },
    ],
    callback
  );
};

const User = mongoose.model("User", userSchema);

export default User;
