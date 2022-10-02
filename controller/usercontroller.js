import User from "../model/user.js";
import helper from "../utility/helper.js";
import sharp from "sharp";
import path from "path";

class UserController {
  uploadFile = async (req, res) => {
    try {
      if (!req.files) {
        return res
          .status(422)
          .json(helper.showValidationErrorResponse("No file uploaded!"));
      }
      if (req.files && req.files.length === 0) {
        return res
          .status(422)
          .json(helper.showValidationErrorResponse("No document uploaded!"));
      }
      let thumb_name =
        req.files[0].filename.split(".")[0] +
        "_thumbnail" +
        path.extname(req.files[0].originalname);
      let __dirname = path.resolve();

      await sharp(__dirname + "/images/" + req.files[0].filename)
        .resize(100, 100)
        .jpeg({ quality: 50 })
        .toFile(__dirname + "/images/" + thumb_name);

      User.addfile(req.files[0].filename, thumb_name, (err, resdata) => {
        if (err) {
          return res
            .status(500)
            .json(helper.showDatabaseErrorResponse("Internal db error!", err));
        } else {
          return res
            .status(200)
            .json(
              helper.showSuccessResponse("Image successfully added", resdata)
            );
        }
      });
    } catch (error) {
      return res
        .status(500)
        .json(helper.showInternalServerErrorResponse("Internal server error!"));
    }
  };
  getFile = async (req, res) => {
    let query = req.query;
    console.log("Query", query);
    User.getFiles(
      query.from_date,
      query.to_date,
      query.filename,
      query.perPage,
      query.page,
      (err, resdata) => {
        if (err) {
          return res
            .status(500)
            .json(helper.showDatabaseErrorResponse("Internal db error!", err));
        } else {
          return res
            .status(200)
            .json(helper.showSuccessResponse("Image Data", resdata));
        }
      }
    );
  };
}

const userinstance = new UserController();

export default userinstance;
