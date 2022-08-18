import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";

import { readExpns } from "../../../controllers/txnControllers";

const handler = nextConnect();

dbConnect();

handler
  .get(readExpns)

export default handler;
