import { MenuIcon, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/feature/api/authapi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-24 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto hidden md:flex items-center h-full px-4">
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2 flex-1">
          <ShoppingBag size={30} className="text-emerald-500 cursor-pointer" />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl cursor-pointer">
              PriceTracker
            </h1>
          </Link>
        </div>

        {/* CENTER - Menu Items */}
        <div className="flex justify-center">
          <ul className="flex gap-10 font-medium items-center">
            <li className="font text-xl hover:text-emerald-600 hover:scale-110 transition-all duration-200 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="font text-xl hover:text-emerald-600 hover:scale-110 transition-all duration-200 cursor-pointer">
              Download App
            </li>
            <li className="font text-xl hover:text-emerald-600 hover:scale-110 transition-all duration-200 cursor-pointer">
              Add Extension
            </li>
            <li className="font text-xl hover:text-emerald-600 hover:scale-110 transition-all duration-200 cursor-pointer">
              Coupons
            </li>
          </ul>
        </div>

        {/* RIGHT - Auth Buttons */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-8">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="/profile">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/myshoplist">My Shoplist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/login")}>Signup</Button>
              </div>
            )}
            <DarkMode />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-24">
        <h1 className="font-extrabold text-2xl">PriceTracker</h1>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const role = user?.role || ""; 
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
          variant="outline"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between mt-8">
          <SheetTitle className="text-xl">PriceTracker</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 items-start pl-4 ">
          {user ? (
            <>
              <Link to="/profile">Edit Profile</Link>
              <Link to="/myshoplist">My Shoplist</Link>
              <span
                className="cursor-pointer text-red-500"
                onClick={logoutHandler}
              >
                Log Out
              </span>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/login">Signup</Link>
            </>
          )}
        </nav>
        {role === "admin" && (
          <SheetFooter className="mt-24">
            <SheetClose asChild>
              <Button type="submit">
                <Link to="/admin/dashboard">Dashboard</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
