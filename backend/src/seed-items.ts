import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!);

  // optional: bersihkan dulu biar tidak double
  await Item.deleteMany({});

  await Item.insertMany([
    // ======================
    // SENJATA
    // ======================
    { name: "Glock", category: "senjata", stock: 1 },
    { name: "Micro SMG", category: "senjata", stock: 1 },
    { name: "Mini SMG", category: "senjata", stock: 1 },
    { name: "SMG", category: "senjata", stock: 1 },
    { name: "Pump Shotgun", category: "senjata", stock: 1 },
    { name: "Vector", category: "senjata", stock: 1 },
    { name: "Navy Revo", category: "senjata", stock: 1 },
    { name: "Black Revo", category: "senjata", stock: 1 },
    { name: "X17 Modular", category: "senjata", stock: 3 },

    // ======================
    // AMMO
    // ======================
    { name: ".51 AE (box)", category: "ammo", stock: 21 },
    { name: "9MM (box)", category: "ammo", stock: 58 },
    { name: "9MM (ammo)", category: "ammo", stock: 13121 },
    { name: ".45 ACP (box)", category: "ammo", stock: 33 },
    { name: "7.62", category: "ammo", stock: 1 },
    { name: ".44 Magnum (box)", category: "ammo", stock: 8 },
    { name: "Ammo Shotgun (box)", category: "ammo", stock: 28 },

    // ======================
    // OBAT / ITEM UMUM
    // ======================
    { name: "Water", category: "obat", stock: 16 },
    { name: "Weed", category: "obat", stock: 967 },
    { name: "Meth", category: "obat", stock: 1 },
    { name: "Liquid Meth", category: "obat", stock: 1 },
    { name: "Cannabis Seed", category: "obat", stock: 74 },
    { name: "Weed Bag", category: "obat", stock: 2273 },
    { name: "Meth Bag", category: "obat", stock: 495 },
    { name: "Cocaine", category: "obat", stock: 18 },
    { name: "Baggy", category: "obat", stock: 1447 },
    { name: "Advanced Fertiliser", category: "obat", stock: 133 },
    { name: "Acid", category: "obat", stock: 133 },
    { name: "Phos", category: "obat", stock: 133 },
    { name: "Pseudo", category: "obat", stock: 133 },

    // ======================
    // VEST
    // ======================
    { name: "Vest Merah", category: "vest", stock: 18 },
    { name: "Vest Biru", category: "vest", stock: 92 },
  ]);

  console.log("Seed items berhasil");
  process.exit();
}

seed();
