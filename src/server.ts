import app from "./app";
import { port } from './config';

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
