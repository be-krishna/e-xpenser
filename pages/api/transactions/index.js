import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";

import { createTxn, readTxns } from "../../../controllers/txnControllers";

const handler = nextConnect();

dbConnect();

handler
  .post(createTxn)
  .get(readTxns)

export default handler;
