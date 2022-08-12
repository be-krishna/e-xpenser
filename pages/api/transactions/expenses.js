import dbConnect from "../../../utils/dbConnect";
import Transaction from "../../../models/Transaction"

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const transactions = await Transaction.find({ 'type': 'expense' });
      res.status(200).json({ success: true, data: transactions })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }

}
