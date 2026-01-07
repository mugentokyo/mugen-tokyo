import express from "express";
import PO from "../models/PO";

const router = express.Router();

/**
 * CREATE PO
 */
router.post("/", async (req, res) => {
  const { user, items } = req.body;

  if (!user || !items || items.length === 0) {
    return res.status(400).json({ message: "Invalid PO data" });
  }

  const poCount = await PO.countDocuments();
  const poNumber = `PO-${String(poCount + 1).padStart(4, "0")}`;

  const po = await PO.create({
    poNumber,
    user,
    items: items.map((i: any) => ({
      itemId: i._id,
      name: i.name,
      kategori: i.kategori,
      qty: i.qty,
    })),
  });

  res.json({ message: "PO berhasil dibuat", po });
});

/**
 * LIST PO (ADMIN)
 */
router.get("/", async (_req, res) => {
  const pos = await PO.find().sort({ createdAt: -1 });
  res.json(pos);
});

/**
 * UPDATE STATUS PO (ADMIN)
 */
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const po = await PO.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(po);
});

export default router;
