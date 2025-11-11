const Cart = require("../../model/cart");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        message: "All fields are required",
        data: null,
      });
    }

    let userCart = await Cart.findOne({ userId: userId });

    if (!userCart) {
      const newCart = new Cart({
        userId: userId,
        items: [{ productId: productId, quantity: quantity }],
      });
      await newCart.save();
      return res.status(201).json({
        message: "Item added to cart successfully",
        data: newCart,
      });
    }

    const existingItem = userCart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity;
    } else {
      userCart.items.push({ productId: productId, quantity: quantity });
    }

    await userCart.save();

    return res.status(200).json({
      message: "Item added to cart successfully",
      data: userCart,
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(500).json({
      message: "Error adding to cart",
      error: err.message,
    });
  }
};

module.exports = addToCart;
