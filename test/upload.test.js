const request = require("supertest");

test("POST /upload", (done) => {
  request("http://localhost:4000")
    .post("/uploadFile")
    .attach("image", "/Users/ankusingh/Desktop/screen.png")
    .expect(200)
    .expect((res) => {
      res.body.data.message = "Image successfully added";
    })
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
});

test("GET /files", (done) => {
  request("http://localhost:4000")
    .get(
      "/getFile?from_date=2022-10-02T11:23:01.355Z&to_date=2022-10-02T11:23:01.355Z&filename=''&perPage=10&page=0"
    )
    .expect(200)
    .expect((res) => {
      res.body.data[0].data.length = 1;
      res.body.data.message = "Image Data";
    })
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
});
