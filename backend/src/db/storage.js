import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProducts, initialUsers } from '../data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'db.json');

class Storage {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(dbFilePath)) {
      const defaultData = {
        products: initialProducts,
        users: initialUsers,
        carts: {},
        orders: [
          {
            orderId: "ord_1001",
            userId: "usr_admin_01",
            items: [
              { id: 1, name: "Wilson Ultra Power XL 112 Tennis Racket", quantity: 1, price: "₹4,999" }
            ],
            totalAmount: "₹4,999",
            status: "Delivered",
            shippingAddress: "221B Baker Street, New Delhi, India",
            paymentMethod: "UPI",
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
          }
        ]
      };
      fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2), 'utf8');
    }
  }

  read() {
    try {
      this.init();
      const content = fs.readFileSync(dbFilePath, 'utf8');
      return JSON.parse(content);
    } catch (e) {
      console.error("DB Read error:", e);
      return { products: initialProducts, users: initialUsers, carts: {}, orders: [] };
    }
  }

  write(data) {
    try {
      fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.error("DB Write error:", e);
    }
  }
}

export const db = new Storage();
