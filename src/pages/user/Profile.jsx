import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLoadUserQuery, useUpdateUserMutation } from "@/feature/api/authapi";
import { useEffect, useState } from "react";
import Loginfail from "@/assets/BrandLogo/login_fail.gif";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated. ");
    }
    if (isError) {
      toast.error(error.message || "Fail to Update profile ");
    }
  }, [error, updateUserData, isSuccess, isError]);
  if (isLoading) return <h1>Profile Loading...</h1>;

  if (!data || !data.user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="max-w-lg text-center flex flex-col items-center">
          {/* Image */}
          <img
            src={Loginfail}
            alt="Login Illustration"
            className="w-40 h-40 mb-6 object-contain"
          />
          <h1 className="text-3xl font-semibold mb-3">Login Required</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your profile.
          </p>
          <Button
            className="cursor-pointer"
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  if (isLoading) return <h1>Profile Loading...</h1>;

  // const { user } = data && data.user;
  const user = data.user;

  return (
    <div className="max-w-4xl mx-auto px-4 my-52">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user.photoUrl || "https://github.com/shadcn.png"}
              alt=""
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-[24px] text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-[24px] text-gray-700 dark:text-gray-300 ml-2">
                {user.name}
              </span>
            </h1>
          </div>

          <div className="mb-2">
            <h1 className="font-semibold text-[24px] text-gray-900 dark:text-gray-100">
              E-mail:
              <span className="font-normal text-[24px] text-gray-700 dark:text-gray-300 ml-2">
                {user.email}
              </span>
            </h1>
          </div>

          <div className="mb-2">
            <h1 className="font-semibold text-[24px] text-gray-900 dark:text-gray-100">
              role:
              <span className="font-normal text-[24px] text-gray-700 dark:text-gray-300 ml-2">
                {user.role}
              </span>
            </h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-8 text-[15px] cursor-pointer">
                Edit Profile
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-[18px]">Edit Profile</DialogTitle>
                <DialogDescription className="text-[15px]">
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-[15px]">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-[15px]">Profile Photo:</label>
                  <input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                  className="text-[15px] cursor-pointer"
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
