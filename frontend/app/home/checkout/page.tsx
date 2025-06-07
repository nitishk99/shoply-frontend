"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import {
  increment,
  decrement,
  removeFromCart,
  clearCart,
} from "../../../store/cartSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import PaymentForm from "../../../components/payment";
import Address from "../../../components/address";

export default function CheckoutPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (items.length === 0) {
    return (
      <Box sx={{ px: 4, py: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Your Cart is Empty
        </Typography>
      </Box>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <Box sx={{ px: 4, py: 8, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h3" fontWeight="bold" mb={4} textAlign="center">
        Checkout
      </Typography>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        <Paper sx={{ flex: 1, p: 3, mb: { xs: 2, md: 0 } }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Order Summary
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {items.map((item) => (
              <Box
                key={item.id + (item.variant || "")}
                component="li"
                sx={{ borderBottom: 1, borderColor: "divider", pb: 2, mb: 2 }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",
                        borderRadius: 8,
                        background: "#f5f5f5",
                      }}
                    />
                    <Typography fontWeight="medium">{item.name}</Typography>
                    {item.variant && (
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        Size: {item.variant}
                      </Typography>
                    )}
                  </Box>
                  <Typography fontWeight="bold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      dispatch(
                        decrement(
                          item.variant
                            ? { id: item.id, variant: item.variant }
                            : { id: item.id }
                        )
                      )
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h6">{item.quantity}</Typography>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      dispatch(
                        increment(
                          item.variant
                            ? { id: item.id, variant: item.variant }
                            : { id: item.id }
                        )
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeFromCart(
                          item.variant
                            ? { id: item.id, variant: item.variant }
                            : { id: item.id }
                        )
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            mt={2}
            borderTop={1}
            pt={2}
          >
            Total: ${(total / 100).toFixed(2)}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </Paper>

        <Box flex={2} display="flex" flexDirection="column" gap={3}>
          <Address form={form} errors={errors} handleChange={handleChange} />
          <PaymentForm customer={form} />
        </Box>
      </Box>
    </Box>
  );
}