import mongoose from "mongoose";
import express from "express";
import Purchase from "../models/Purchase";
import Item from "../models/Item";
import User from "../models/User";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const purchases = await Purchase.find()
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil pembelian" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, items } = req.body;

    if (!user?.id || !items?.length) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const dbUser = await User.findById(user.id);
    if (!dbUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // VALIDASI STOK
    for (const i of items) {
      const dbItem = await Item.findById(i.id);
      if (!dbItem) {
        return res.status(400).json({ message: "Item tidak ditemukan" });
      }
      if (dbItem.stock < i.qty) {
        return res.status(400).json({
          message: `Stok tidak cukup untuk ${dbItem.name}`,
        });
      }
    }

    // SIMPAN PURCHASE
    const purchase = await Purchase.create({
      user: {
        userId: dbUser._id,
        username: dbUser.username,
        role: dbUser.role,
      },
      items: items.map((i: any) => ({
        itemId: i.id,
        name: i.name,
        qty: i.qty,
      })),
      totalItems: items.reduce((a: number, b: any) => a + b.qty, 0),
    });

    // KURANGI STOK SETELAH PURCHASE BERHASIL
    for (const i of items) {
      await Item.findByIdAndUpdate(i.id, {
        $inc: { stock: -i.qty },
      });
    }

    res.json({ message: "Pembelian berhasil", purchase });
  } catch (err) {
    console.error("PURCHASE ERROR:", err);
    res.status(500).json({ message: "Gagal menyimpan pembelian" });
  }
});


export default router;