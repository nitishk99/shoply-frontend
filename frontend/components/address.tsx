import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

type UserAddressProps = {
  form: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  errors: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone: string) {
  return /^\d{10}$/.test(phone);
}
function validateZip(zip: string) {
  return /^\d{5,6}$/.test(zip);
}

export default function Address({ form, errors, handleChange }: UserAddressProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Shipping & Contact Details
      </Typography>
      <TextField
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        error={!!errors.fullName || form.fullName.trim() === ""}
        helperText={errors.fullName || (form.fullName.trim() === "" ? "Full Name is required" : "")}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email || (form.email !== "" && !validateEmail(form.email))}
        helperText={
          errors.email ||
          (form.email !== "" && !validateEmail(form.email) ? "Enter a valid email" : "")
        }
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        error={!!errors.phone || (form.phone !== "" && !validatePhone(form.phone))}
        helperText={
          errors.phone ||
          (form.phone !== "" && !validatePhone(form.phone) ? "Enter a valid 10-digit phone" : "")
        }
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Address"
        name="address"
        value={form.address}
        onChange={handleChange}
        error={!!errors.address || form.address.trim() === ""}
        helperText={errors.address || (form.address.trim() === "" ? "Address is required" : "")}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        error={!!errors.city || form.city.trim() === ""}
        helperText={errors.city || (form.city.trim() === "" ? "City is required" : "")}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="State"
        name="state"
        value={form.state}
        onChange={handleChange}
        error={!!errors.state || form.state.trim() === ""}
        helperText={errors.state || (form.state.trim() === "" ? "State is required" : "")}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Zip Code"
        name="zip"
        value={form.zip}
        onChange={handleChange}
        error={!!errors.zip || (form.zip !== "" && !validateZip(form.zip))}
        helperText={
          errors.zip ||
          (form.zip !== "" && !validateZip(form.zip) ? "Enter a valid zip code" : "")
        }
        fullWidth
        margin="normal"
        required
      />
    </Paper>
  );
}