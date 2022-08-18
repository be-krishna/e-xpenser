import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";

import { readRevs } from "../../../controllers/txnControllers";

const handler = nextConnect();

dbConnect();

handler
  .get(readRevs)

export default handler;
