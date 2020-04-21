import app from "./app";
const { PORT = 3000 } = process.env;

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
