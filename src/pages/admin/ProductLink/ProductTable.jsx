import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import API from "@/feature/api/api";
import restart from "@/assets/BrandLogo/restart.gif"

const ProductTable = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 7;
  const [total, setTotal] = useState(0);

  // Load products from backend
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/api/v1/products?page=${page}&limit=${limit}`);
      setProducts(res.data.products || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Failed to load products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  // Re-scrape a product
  const handleRescrape = async (product) => {
    if (!product?.url) return alert("No URL to rescrape");

    try {
      setActionLoadingId(product._id);
      await API.post(`/api/v1/products/scrape`, { url: product.url });
      await loadProducts();
      alert("Re-scrape done");
    } catch (err) {
      console.error("Rescrape error:", err);
      alert("Failed to rescrape");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      setActionLoadingId(id);
      await API.delete(`/api/v1/products/${id}`);
      await loadProducts();
      alert("Deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Edit product
  const handleEdit = (id) => navigate(`/admin/product/edit/${id}`);


  // Relative time
  const getRelative = (dateStr) => {
    if (!dateStr) return "—";
    const diff = Date.now() - new Date(dateStr).getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    return `${Math.floor(hr / 24)}d ago`;
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      <Button onClick={() => navigate(`create`)}>Create a new Product</Button>

      <Table>
        <TableCaption>Tracked Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Original Price</TableHead>
            <TableHead>Lowest Price</TableHead>
            <TableHead>Highest Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={9}>Loading...</TableCell></TableRow>
          ) : products.length === 0 ? (
            <TableRow><TableCell colSpan={9}>No products found</TableCell></TableRow>
          ) : (
            products.map((item) => {
              const status =
                item.currentPrice == null
                  ? { text: "Error", color: "text-red-600" }
                  : item.currentPrice < (item.originalPrice || Infinity)
                  ? { text: "Price Drop", color: "text-green-600" }
                  : item.currentPrice > (item.originalPrice || -Infinity)
                  ? { text: "Price Up", color: "text-red-600" }
                  : { text: "No Change", color: "text-yellow-600" };

              return (
                <TableRow key={item._id}>
                  <TableCell className="font-medium max-w-70 truncate">{item.title}</TableCell>
                  <TableCell>{item.category || "—"}</TableCell>
                  <TableCell>₹{item.currentPrice ?? "—"}</TableCell>
                  <TableCell>₹{item.originalPrice ?? "—"}</TableCell>
                  <TableCell>₹{item.lowestPrice ?? "—"}</TableCell>
                  <TableCell>₹{item.highestPrice ?? "—"}</TableCell>
                  <TableCell><span className={`${status.color}`}>{status.text}</span></TableCell>
                  <TableCell>{getRelative(item.updatedAt)}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      onClick={() => handleRescrape(item)}
                      disabled={actionLoadingId === item._id}
                    >
                      {actionLoadingId === item._id ? <img src={restart} className="w-5, h-5 bg-black"/> : <img src={restart} className="w-5, h-5 rounded-4xl bg-black"/>}
                    </Button>
                    <Button onClick={() => handleEdit(item._id)}>Edit</Button>
                    <Button
                      onClick={() => handleDelete(item._id)}
                      disabled={actionLoadingId === item._id}
                    >
                      {actionLoadingId === item._id ? "..." : "Delete"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
        <span className="text-sm">Page {page} / {totalPages}</span>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default ProductTable;





