const BACKEND_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${BACKEND_HOST}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function registerUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${BACKEND_HOST}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function fetchLatestOrder() {
  const res = await fetch(`${BACKEND_HOST}/api/orders/latest`);
  if (!res.ok) throw new Error("Failed to fetch latest order");
  return await res.json();
}

export async function sendOrderToApi(
  items: any[],
  customerData: any,
  confirmationMessage: string,
  orderNumber: string
) {
  try {
    await fetch(`${BACKEND_HOST}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber,
        items,
        customerData,
        confirmationMessage,
      }),
    });
  } catch (err) {
    console.error("Failed to send order to API:", err);
  }
}

export async function triggerOrderEmail({
  orderNumber,
  email,
  items,
  customerData,
  confirmationMessage,
  status,
}: {
  orderNumber?: string;
  email: string;
  items?: any[];
  customerData?: any;
  confirmationMessage?: string;
  status: "success" | "declined" | "error";
}) {
  try {
    await fetch(`${BACKEND_HOST}/api/mail/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        status === "success"
          ? { orderNumber, email, items, customerData, confirmationMessage, status }
          : { email, status }
      ),
    });
  } catch (err) {
    console.error("Failed to trigger order email:", err);
  }
}

export async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
}

export async function fetchProductById(id: string | number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return await res.json();
}