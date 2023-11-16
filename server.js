const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

app.post("/image", async (req, res) => {
  console.log(1);
  body = {
    key: "",
    prompt: req.body.mess,
    width: "512",
    height: "512",
    samples: "3",
    num_inference_steps: 21,
    guidance_scale: 7.5,
    seed: null,
  };

  const response = await axios.post(
    "https://stablediffusionapi.com/api/v3/text2img",
    body
  );
  console.log(response.data);
  res.send(response.data);
});

app.post("/upload", upload, (req, res) => {
  console.log(req.file);
});

app.listen(PORT, () => {
  console.log("ur server is running on port 8000");
});
