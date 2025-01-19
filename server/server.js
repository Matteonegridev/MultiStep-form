import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.post("/api", (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, "data.json");

  fs.readFile(filePath, "utf8", (err, fileData) => {
    let jsonData = [];

    if (!err && fileData) {
      jsonData = JSON.parse(fileData);
    }

    jsonData.push(data);

    fs.writeFile(
      filePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing to file:", writeErr);
          return res
            .status(500)
            .send({ status: "error", message: "Failed to save data" });
        }

        console.log("Data saved to data.json");
        res.status(200).send({ status: "received", data });
      },
    );
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
