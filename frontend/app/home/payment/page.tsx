"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function PaymentPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Payment Successful!");
      setLoading(false);
    }, 1500);
  };

  return (
    <Box sx={{ px: 4, py: 8, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Payment
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Bill Summary
        </Typography>
        <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
          {items.map((item) => (
            <Box key={item.id} component="li" sx={{ mb: 1 }}>
              <Typography>
                {item.name} x {item.quantity} = ${(item.price * item.quantity / 100).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="h6" fontWeight="bold" mt={2}>
          Total: ${(total / 100).toFixed(2)}
        </Typography>
      </Paper>
      <form onSubmit={handlePayment}>
        <TextField
          label="Address"
          fullWidth
          required
          value={address}
          onChange={e => setAddress(e.target.value)}
          margin="normal"
        />
        <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>
          Card Details
        </Typography>
        <TextField
          label="Card Number"
          fullWidth
          required
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          margin="normal"
        />
        <Box display="flex" gap={2}>
          <TextField
            label="Expiry"
            required
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            margin="normal"
            sx={{ flex: 1 }}
            placeholder="MM/YY"
          />
          <TextField
            label="CVV"
            required
            value={cvv}
            onChange={e => setCvv(e.target.value)}
            margin="normal"
            sx={{ flex: 1 }}
            type="password"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Box>
  );
}