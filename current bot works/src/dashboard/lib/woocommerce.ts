import axios, { type AxiosInstance } from "axios";

let _client: AxiosInstance | null = null;

function getClient(): AxiosInstance {
  if (!_client) {
    const url = process.env.WOOCOMMERCE_URL!;
    const key = process.env.WOOCOMMERCE_CONSUMER_KEY!;
    const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET!;
    _client = axios.create({
      baseURL: `${url}/wp-json/wc/v3`,
      auth: { username: key, password: secret },
      timeout: 30000,
    });
  }
  return _client;
}

export async function getProducts(perPage = 100) {
  const products: any[] = [];
  let page = 1;
  while (true) {
    const res = await getClient().get(`/products?per_page=${perPage}&page=${page}`);
    products.push(...res.data);
    const totalPages = parseInt(res.headers["x-wp-totalpages"] ?? "1");
    if (page >= totalPages) break;
    page++;
  }
  return products;
}

export async function getOrders(params: Record<string, string> = {}) {
  const query = new URLSearchParams({ per_page: "100", ...params });
  const res = await getClient().get(`/orders?${query}`);
  return res.data;
}

export async function getRecentOrders(sinceDays: number) {
  const since = new Date();
  since.setDate(since.getDate() - sinceDays);
  return getOrders({ after: since.toISOString() });
}

export async function searchCustomers(query: string) {
  const res = await getClient().get(`/customers?search=${encodeURIComponent(query)}&per_page=10`);
  return res.data;
}
