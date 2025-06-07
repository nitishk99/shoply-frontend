"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { fetchLatestOrder } from "../../../services/api";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CustomerData = {
  name: string;
  address: string;
  email?: string;
  phone?: string;
};

type Order = {
  orderNumber: string;
  items?: OrderItem[];
  customerData?: CustomerData;
  confirmationMessage: string;
  createdAt?: string;
};

export default function ThankYouPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestOrder()
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ px: 4, py: 8, textAlign: "center" }}>
        <Typography variant="h5">Loading your order...</Typography>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ px: 4, py: 8, textAlign: "center" }}>
        <Typography variant="h5">No order found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4, py: 8, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h3" fontWeight="bold" mb={2} textAlign="center">
        Thank You For Your Purchase!
      </Typography>
      <Typography variant="h6" mb={2} textAlign="center">
        Your order <b>{order.orderNumber}</b> has been placed successfully.
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Order Summary
        </Typography>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {(order.items ?? []).map((item) => (
            <li key={item.id} style={{ marginBottom: 8 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <span>
                  {item.name} x {item.quantity} — $
                  {(item.price * item.quantity / 100).toFixed(2)}
                </span>
              </Box>
            </li>
          ))}
        </ul>
        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
          Total: $
          {(
            (Array.isArray(order.items)
              ? order.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )
              : 0) / 100
          ).toFixed(2)}
        </Typography>
      </Paper>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Customer Details
        </Typography>
        {order.customerData ? (
          <>
            <Typography>Name: {order.customerData.name}</Typography>
            <Typography>Address: {order.customerData.address}</Typography>
            {order.customerData.email && (
              <Typography>Email: {order.customerData.email}</Typography>
            )}
            {order.customerData.phone && (
              <Typography>Phone: {order.customerData.phone}</Typography>
            )}
          </>
        ) : (
          <Typography>No customer data available.</Typography>
        )}
      </Paper>
      <Typography
        variant="h5"
        color="success.main"
        textAlign="center"
        mt={2}
      >
        {order.confirmationMessage}
      </Typography>
    </Box>
  );
}