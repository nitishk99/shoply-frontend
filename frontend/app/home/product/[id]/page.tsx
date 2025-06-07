"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../store/cartSlice";
import { RootState } from "../../../../store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { fetchProductById } from "../../../../services/api";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number | string;
  image: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [size, setSize] = useState("S");

  const cartItem = cartItems.find(
    (item) => item.id === Number(id) && item.variant === size
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductById(id as string)
      .then((data: Product) => setProduct(data))
      .catch(() => setProduct(null));
  }, [id]);

  useEffect(() => {
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItem, size]);

  useEffect(() => {
    if (product) {
      if (quantity === 0 && cartItem) {
        dispatch(
          addToCart({
            id: product.id,
            name: product.title,
            price: Math.round(Number(product.price) * 100),
            quantity: 0,
            image: product.image,
            variant: size,
          })
        );
      }
      if (quantity > 0) {
        dispatch(
          addToCart({
            id: product.id,
            name: product.title,
            price: Math.round(Number(product.price) * 100),
            quantity,
            image: product.image,
            variant: size,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, product, size]);

  if (!product) return <Typography>Loading...</Typography>;

  const price = Number(product.price);

  const handleGoToCheckout = () => {
    router.push("/home/checkout");
  };

  const handleSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string
  ) => {
    if (newSize) setSize(newSize);
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4} alignItems="center" p={4}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Image
          src={product.image}
          alt={product.title}
          width={320}
          height={320}
          style={{ objectFit: "cover", borderRadius: 8 }}
          priority
        />
      </Paper>
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2}>{product.title}</Typography>
        <Typography color="text.secondary" mb={2}>{product.description}</Typography>
        <Typography variant="h6" color="text.primary" mb={2}>
          ${price.toFixed(2)}
        </Typography>
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Size:
          </Typography>
          <ToggleButtonGroup
            value={size}
            exclusive
            onChange={handleSizeChange}
            aria-label="size"
            size="small"
          >
            <ToggleButton
              value="S"
              aria-label="small"
              sx={{
                color: "#000",
                background: "#fff",
                border: "1px solid #ddd",
                '&.Mui-selected': {
                  background: "#fff",
                  color: "#000",
                  border: "2px solid #1976d2"
                }
              }}
            >
              S
            </ToggleButton>
            <ToggleButton
              value="M"
              aria-label="medium"
              sx={{
                color: "#000",
                background: "#fff",
                border: "1px solid #ddd",
                '&.Mui-selected': {
                  background: "#fff",
                  color: "#000",
                  border: "2px solid #1976d2"
                }
              }}
            >
              M
            </ToggleButton>
            <ToggleButton
              value="L"
              aria-label="large"
              sx={{
                color: "#000",
                background: "#fff",
                border: "1px solid #ddd",
                '&.Mui-selected': {
                  background: "#fff",
                  color: "#000",
                  border: "2px solid #1976d2"
                }
              }}
            >
              L
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <IconButton
            sx={{ background: "#fff", border: "1px solid #ddd" }}
            color="primary"
            onClick={() => setQuantity((q) => Math.max(0, q - 1))}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6">{quantity}</Typography>
          <IconButton
            sx={{ background: "#fff", border: "1px solid #ddd" }}
            color="primary"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Total: ${(price * quantity).toFixed(2)}
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleGoToCheckout}>
            Go to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}