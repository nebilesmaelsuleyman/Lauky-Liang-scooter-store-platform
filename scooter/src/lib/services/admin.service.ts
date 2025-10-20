// services/adminService.ts
import Order from "@/lib/models/orderModel";
import Product from "@/lib/models/productModel";
import User from "@/lib/models/userModel";

export async function getAdminStats() {
  const totalRevenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalPrice" } } }
  ]);

  const totalRevenue = totalRevenueAgg[0]?.total || 0;
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalCustomers = await User.countDocuments({ role: "user" });

  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    totalCustomers,
  };
}
