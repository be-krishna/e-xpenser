import Transaction from '../models/txn';


// Create txn
export const createTxn = async (req, res) => {
  try {
    const txn = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      txn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// Read txns (all)
export const readTxns = async (req, res) => {
  try {
    const txns = await Transaction.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      txns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// Read txns
export const readTxn = async (req, res) => {
  try {
    const txn = await Transaction.findById(req.query.id)

    if (txn) {
      res.status(200).json({
        success: true,
        txn
      })
    } else {
      res.status(422).json({
        success: false,
        error
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// Update txns
export const updateTxn = async (req, res) => {
  try {
    const txnId = req.query.id;
    const newTxn = req.body;

    await Transaction.findOneAndUpdate({ _id: txnId }, newTxn);

    res.status(200).json({
      success: true,
      txn: newTxn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
}

// Delete txns
export const deleteTxn = async (req, res) => {
  try {
    const txn = await Transaction.findById(req.query.id);

    if (!txn) {
      return res.status(404).json({
        success: false
      })
    }

    await txn.deleteOne({ _id: req.query.id })

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
