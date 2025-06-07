"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../store/orderSlice";
import { clearCart } from "../store/cartSlice";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { RootState } from "../store/store";
import {
  sendOrderToApi,
  triggerOrderEmail,
} from "../services/api";

function validateCard(card: string) {
  return /^(1|2|3|\d{16})$/.test(card);
}
function validateExpiry(expiry: string) {
  const [mm, yy] = expiry.split("/");
  if (!mm || !yy) return false;
  const month = parseInt(mm, 10);
  const year = parseInt(yy, 10) + 2000;
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const exp = new Date(year, month);
  return exp > now;
}
function validateCVV(cvv: string) {
  return /^\d{3}$/.test(cvv);
}

interface CustomerData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export default function PaymentForm({ customer }: { customer: CustomerData }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    card: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!validateCard(form.card))
      newErrors.card = "Card must be 16 digits or 1/2/3 for simulation";
    if (!validateExpiry(form.expiry)) newErrors.expiry = "Invalid expiry";
    if (!validateCVV(form.cvv)) newErrors.cvv = "CVV must be 3 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildCustomerData() {
    return {
      name: customer.fullName,
      address: `${customer.address}, ${customer.city}, ${customer.state}, ${customer.zip}`,
      email: customer.email,
      phone: customer.phone,
    };
  }

  async function handlePaymentSuccess() {
    const orderNumber =
      "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
    const customerData = buildCustomerData();
    const confirmationMessage = "Thank you for your order!";

    await sendOrderToApi(items, customerData, confirmationMessage, orderNumber);

    await triggerOrderEmail({
      orderNumber,
      email: customerData.email,
      items,
      customerData,
      confirmationMessage,
      status: "success",
    });

    dispatch(
      setOrder({
        orderNumber,
        items,
        total,
        customer: { ...customer, ...form },
      })
    );
    dispatch(clearCart());
    setResult("approved");
    setLoading(false);
    router.push("/home/thankyou");
  }

  async function handlePaymentFail(status: "declined" | "error") {
    await triggerOrderEmail({
      email: customer.email,
      status,
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);

    setTimeout(async () => {
      if (form.card === "1") {
        await handlePaymentSuccess();
        return;
      } else if (form.card === "2") {
        await handlePaymentFail("declined");
        setResult("declined");
      } else if (form.card === "3") {
        await handlePaymentFail("error");
        setResult("error");
      }
      setLoading(false);
    }, 1500);
  };

  function renderResultMessage() {
    if (result === "approved")
      return (
        <Typography color="success.main" mt={2}>
          Transaction Approved!
        </Typography>
      );
    if (result === "declined")
      return (
        <Typography color="error.main" mt={2}>
          Transaction Declined.
        </Typography>
      );
    if (result === "error")
      return (
        <Typography color="warning.main" mt={2}>
          Payment Gateway Error. Please try again.
        </Typography>
      );
    return null;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Payment Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Card Number"
          name="card"
          value={form.card}
          onChange={handleChange}
          error={!!errors.card}
          helperText={errors.card}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 16 }}
        />
        <TextField
          label="Expiry Date (MM/YY)"
          name="expiry"
          value={form.expiry}
          onChange={handleChange}
          error={!!errors.expiry}
          helperText={errors.expiry}
          fullWidth
          margin="normal"
          placeholder="MM/YY"
        />
        <TextField
          label="CVV"
          name="cvv"
          value={form.cvv}
          onChange={handleChange}
          error={!!errors.cvv}
          helperText={errors.cvv}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 3 }}
        />
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
      {renderResultMessage()}
    </Paper>
  );
}