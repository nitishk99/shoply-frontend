import React from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type CardProps = {
  image: string;
  title: string;
  price: string;
  id: number;
};


export const CardComponent = ({ image, title, price, id }: CardProps) => {
  const router = useRouter();

  const handleBuy = () => {
    router.push(`/home/product/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 320,
        minWidth: 320,
        m: 2,
        p: 2, // Add padding to the card
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ height: 180, width: "100%", objectFit: "contain", background: "#fafafa" }}
      />
      <CardContent sx={{ p: 2 }}> {/* Add padding to CardContent */}
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="success.main" fontWeight="bold">
          {price}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}> {/* Add horizontal and bottom padding to actions */}
        <Button variant="contained" color="primary" fullWidth onClick={handleBuy}>
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
};