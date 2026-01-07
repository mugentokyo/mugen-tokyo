import express from "express";
import Item from "../models/Item";

const router = express.Router();

router.get("/", async (_, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post("/add-to-cart/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item || item.stock === 0)
    return res.status(400).json({ message: "Out of stock" });

  item.stock = item.stock - 1;
  await item.save();

  res.json(item);
});

router.post("/", async (req, res) => {
  try {
    const { name, category, stock, image } = req.body;

    // validasi sederhana
    if (!name || !category) {
      return res.status(400).json({
        message: "Name dan category wajib diisi",
      });
    }

    const newItem = await Item.create({
      name,
      category,
      stock: stock ?? 0,
      image,
    });

    res.status(201).json({
      message: "Item berhasil ditambahkan",
      item: newItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Gagal menambahkan item",
    });
  }
});

router.put("/:id/add-stock", async (req, res) => {
  const { qty } = req.body;

  if (!qty || qty <= 0) {
    return res.status(400).json({ message: "Qty tidak valid" });
  }

  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Item tidak ditemukan" });
  }

  item.stock += qty;
  await item.save();

  res.json({ message: "Stok berhasil ditambahkan", item });
});

export default router;
