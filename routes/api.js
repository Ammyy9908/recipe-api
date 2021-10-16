const router = require("express").Router();

const verifyApi = (req, res, next) => {
  const api_key = req.headers.authorization;

  console.log(api_key);

  if (!api_key) {
    return res.status(403).send({
      message: "Access denied provide a API Key in authorization headers",
    });
  }
  next();
};

router.get("/recents", verifyApi, async (req, res) => {});

module.exports = router;
