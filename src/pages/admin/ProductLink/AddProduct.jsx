import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";

import category_amazon from "@/assets/BrandLogo/category_amazon.png";
import category_flipkart from "@/assets/BrandLogo/category_flipkart.png";
import category_ajio from "@/assets/BrandLogo/category_ajio.png";
import category_myntra from "@/assets/BrandLogo/category_myntra.png";
import category_ebay from "@/assets/BrandLogo/category_ebay.png";
import category_nykaa from "@/assets/BrandLogo/category_nykaa.png";
import category_Etsy from "@/assets/BrandLogo/category_etsy.png";
import category_meessho from "@/assets/BrandLogo/category_meesho.png";

// ------------------------------------
// Website Config
// ------------------------------------
const WEBSITES = [
  { id: "amazon", logo: category_amazon },
  { id: "flipkart", logo: category_flipkart },
  { id: "ajio",  logo: category_ajio },
  { id: "myntra",  logo: category_myntra },
  { id: "ebay",  logo: category_ebay },
  { id: "nykaa",  logo: category_nykaa },
  { id: "etsy",  logo: category_Etsy },
  { id: "meesho", logo: category_meessho },
];

// ------------------------------------
// URL Validator
// ------------------------------------
const isValidURL = (url) => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    const allowed = [
      "amazon",
      "flipkart",
      "ajio",
      "myntra",
      "ebay",
      "nykaa",
      "etsy",
      "meesho",
    ];

    return allowed.some((site) => host.includes(site));
  } catch {
    return false;
  }
};

// ------------------------------------
// Component
// ------------------------------------
const AddProduct = () => {
  const [productLink, setProductLink] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ------------------------------------
  // Submit Handler
  // ------------------------------------
  const createProductHandler = async () => {
    if (!productLink || !category) {
      alert("Product Link + Category required");
      return;
    }

    const selectedCategory = category.toLowerCase().trim();

    if (!isValidURL(productLink)) {
      alert("Please provide a valid e-commerce product link");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Backend Scrape API Request
    const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/products/scrape`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: productLink,
        category: selectedCategory,
      }),
    }
  );


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to scrape product");
      }

      const data = await response.json();
      console.log("Scraped Product:", data);

      setMessage("Product added successfully!");

      // Redirect to admin product table page
      setTimeout(() => navigate("/admin/product"), 1200);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to scrape product");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------
  // UI
  // ------------------------------------
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Add New Product to Track</h1>
        <p className="text-sm text-gray-600">
          Enter the product details and link to start tracking its price history.
        </p>
      </div>

      <div className="space-y-4">
        {/* Product Link */}
        <div>
          <Label>Product Link</Label>
          <Input
            type="url"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            placeholder="Paste Flipkart / Amazon / Ajio / Myntra URL"
          />
        </div>

        {/* Category Selector */}
        <div>
          <Label>Category (E-commerce Website)</Label>
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Website" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Website</SelectLabel>
                {WEBSITES.map((site) => (
                  <SelectItem key={site.id} value={site.id}>
                    <div className="flex items-center gap-2 py-2">
                      <img
                        src={site.logo}
                        alt={site.label}
                        className="h-10 w-32 object-contain"
                      />
                      <span>{site.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <Button variant="outline" onClick={() => navigate("/admin/product")}>
            Back
          </Button>

          <Button disabled={isLoading} onClick={createProductHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>

        {/* Status Message */}
        {message && (
          <p className="text-lg font-medium mt-4 text-blue-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
