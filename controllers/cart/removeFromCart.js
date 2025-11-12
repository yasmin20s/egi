const Cart = require("../../model/cart");

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!id || !userId) {
      return res.status(400).json({
        message: "Product ID and User ID are required",
        data: null,
      });
    }

    const userCart = await Cart.findOne({ userId: userId });

    if (!userCart) {
      return res.status(404).json({
        message: "Cart not found",
        data: null,
      });
    }

    const itemIndex = userCart.items.findIndex((item) => item.productId === id);

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
        data: null,
      });
    }

    userCart.items.splice(itemIndex, 1);
    await userCart.save();

    return res.status(200).json({
      message: "Item removed from cart successfully",
      data: userCart,
    });
  } catch (err) {
    console.error("Error removing from cart:", err);
    return res.status(500).json({
      message: "Error removing from cart",
      error: err.message,
    });
  }
};

module.exports = removeFromCart;

