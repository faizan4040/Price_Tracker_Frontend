import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import history from "@/assets/BrandLogo/history.gif";
import { ArrowBigDownIcon, Link, ScanSearch, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandSlider from "./BrandSlider";

const supportedHosts = ["amazon", "flipkart", "myntra"];

const isValidProductURL = (url) => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return supportedHosts.some((site) => host.includes(site));
  } catch {
    return false;
  }
};

const HeroSection = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidProductURL(searchPrompt)) {
      return alert("Invalid link. Please enter a valid product URL");
    }

     try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "https://price-tracker-backend-1.onrender.com/api/v1/products/scrape-only",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: searchPrompt }),
        }
      );


      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.msg || "Failed to scrape product");
      }

      // Navigate to preview page with scraped product
      navigate("/product/preview", {
        state: { product: data.product },
      });
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to scrape product");
    } finally {
      setLoading(false);
    }
  };

  // Placeholder animation
  const placeholders = [
    { text: "Paste product link", icon: <Link className="w-6 h-6 text-gray-400" /> },
    { text: 'Search "Myntra" coupons', icon: <Search className="w-6 h-6 text-gray-400" /> },
    { text: "Track any item instantly…", icon: <ScanSearch className="w-6 h-6 text-gray-400" /> },
    { text: 'Search "Make My Trip" coupons', icon: <Search className="w-6 h-6 text-gray-400" /> },
  ];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length > 0) return;

    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setAnimate(true);
      }, 250);
    }, 2000);

    return () => clearInterval(interval);
  }, [value]);

  const current = placeholders[index];

  return (
    <div className="relative bg-linear-to-r from-green-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-20 px-6 sm:px-10 lg:px-14 text-center mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <div className="flex flex-col items-center w-full gap-4 md:gap-2 lg:gap-5 2xl:gap-6">
          <h1 className="flex items-center gap-3 shadow-2xl rounded-xl p-4 font-mono font-extrabold text-black bg-white text-xl sm:text-4xl lg:text-xl whitespace-nowrap">
            <img src={history} className="lg:h-9 lg:w-9 h-8 w-8 -ml-2" />
            Price History & More
          </h1>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-[4rem] font-medium">
            Price History & Tracker
          </h1>
          <p className="text-gray-200 dark:text-gray-400 text-xl sm:text-2xl lg:text-3xl">
            <span className="text-amber-300">Stop Overpaying!</span> Use Price history and check real-time deals
          </p>
        </div>

        {/* Form */}
        <div className="mt-16 sm:mt-20">
          {value.length === 0 && (
            <div className="lg:hidden mb-4 flex items-center justify-center gap-2">
              {current.icon}
              <span className="text-gray-300 text-lg sm:text-xl">{current.text}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden w-full lg:max-w-4xl mx-auto mb-16 relative"
          >
            {value.length === 0 && (
              <div
                className={`hidden lg:flex absolute left-6 top-1/3 -translate-y-1/2 items-center transition-all duration-500 ${
                  animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                {current.icon}
                <span className="ml-2 text-2xl text-gray-400 dark:text-gray-500">{current.text}</span>
              </div>
            )}

            <Input
              type="text"
              value={searchPrompt}
              onChange={(e) => setSearchPrompt(e.target.value)}
              onFocus={() => setAnimate(false)}
              onBlur={() => setAnimate(true)}
              required
              disabled={loading}
              placeholder=""
              className="flex-1 border-none focus-visible:ring-0 px-12 sm:px-14 lg:px-16 py-4 sm:py-6 lg:py-10 text-gray-800 dark:text-gray-100 text-lg sm:text-xl lg:text-2xl min-w-0"
            />

            <Button
              type="submit"
              disabled={searchPrompt === "" || loading}
              className="text-base sm:text-lg md:text-xl lg:text-2xl bg-blue-600 dark:bg-gray-700 text-white px-4 sm:px-6 md:px-7 lg:px-8 py-4 sm:py-6 lg:py-8 rounded-xl cursor-pointer lg:mr-4 hover:bg-blue-700 dark:hover:bg-gray-600 whitespace-nowrap"
            >
              {loading ? "Tracking..." : "Track Price"}
            </Button>
          </form>

          {message && <p className="mb-4 text-white text-lg">{message}</p>}

          <p className="text-gray-200 dark:text-gray-400 text-xl sm:text-2xl lg:text-2xl mt-6">
            Amazon Price Tracker || Flipkart Price Tracker || Myntra Price Tracker
          </p>

          <div className="mt-6">
            <BrandSlider />
          </div>

          <div className="mt-6">
            <Button
              onClick={() =>
                document.getElementById("loot-deals").scrollIntoView({ behavior: "smooth" })
              }
              className="p-6 px-16 text-2xl cursor-pointer"
            >
              Loot Deals
              <ArrowBigDownIcon size={30} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;