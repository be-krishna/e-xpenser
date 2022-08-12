import nextConnect from "next-connect";

import dbConnect from "../../../lib/dbConnect";
import { readTxn, updateTxn, deleteTxn } from "../../../controllers/txnControllers";


const handler = nextConnect()

dbConnect()

handler
  .get(readTxn)
  .put(updateTxn)
  .delete(deleteTxn)

export default handler
