import { db } from '../db/storage.js';

// GET /api/product/OnSale (for frontend Redux)
export const getOnSaleProducts = (req, res) => {
  const data = db.read();
  const onSale = data.products.filter(p => p.onSale);
  return res.status(200).json({
    message: "On sale products fetched successfully",
    payload: onSale
  });
};

// GET /api/product/Featured (for frontend Redux)
export const getFeaturedProducts = (req, res) => {
  const data = db.read();
  return res.status(200).json({
    message: "Featured products fetched successfully",
    payload: data.products
  });
};

// GET /api/product (All with query filters)
export const getAllProducts = (req, res) => {
  const data = db.read();
  let result = [...data.products];
  const { category, search, minPrice, maxPrice, sort } = req.query;

  if (category) {
    result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
  }

  if (sort === 'price-asc') {
    result.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
  } else if (sort === 'price-desc') {
    result.sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')));
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  return res.status(200).json({
    message: "Products fetched successfully",
    total: result.length,
    payload: result
  });
};

// GET /api/product/:id
export const getProductById = (req, res) => {
  const data = db.read();
  const id = parseInt(req.params.id);
  const product = data.products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json({
    message: "Product details",
    payload: product
  });
};

// POST /api/product (Create new product)
export const createProduct = (req, res) => {
  const { name, price, oldPrice, category, image, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const data = db.read();
  const newProduct = {
    id: Date.now(),
    name,
    price: price.startsWith('₹') ? price : '₹' + price,
    oldPrice: oldPrice ? (oldPrice.startsWith('₹') ? oldPrice : '₹' + oldPrice) : '',
    image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    category: category || "general",
    sold: 0,
    stock: 20,
    rating: 5,
    onSale: Boolean(oldPrice),
    description: description || ""
  };

  data.products.unshift(newProduct);
  db.write(data);

  return res.status(201).json({
    message: "Product created successfully",
    payload: newProduct
  });
};

// PUT /api/product/:id (Update product)
export const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const data = db.read();
  const index = data.products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  data.products[index] = { ...data.products[index], ...req.body };
  db.write(data);

  return res.status(200).json({
    message: "Product updated successfully",
    payload: data.products[index]
  });
};

// DELETE /api/product/:id
export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const data = db.read();
  data.products = data.products.filter(p => p.id !== id);
  db.write(data);

  return res.status(200).json({ message: "Product deleted successfully" });
};

// GET /api/product/categories
export const getCategories = (req, res) => {
  const data = db.read();
  const counts = {};
  data.products.forEach(p => {
    const cat = p.category || 'others';
    counts[cat] = (counts[cat] || 0) + 1;
  });

  return res.status(200).json({
    message: "Categories fetched",
    payload: Object.entries(counts).map(([name, count]) => ({ name, count }))
  });
};
