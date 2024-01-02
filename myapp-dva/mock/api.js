export default {
  "GET /users": {
    name: "张三",
    age: 18,
    location: "北京",
  },

  "POST /users/login": (req, res) => {
    console.log(req.body);
    if (req.body.username === "admin" && req.body.password === "123456") {
      res.send({
        msg: "success",
      });
    } else {
      res.send({
        msg: "failed",
      });
    }
  },
};
