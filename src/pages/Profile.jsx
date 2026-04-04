import React from "react";
import EyeClose from "../components/auth/EyeClose";
import EyeOpen from "../components/auth/EyeOpen";
import http from "../lib/http";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/slice/auth.slice";

export default function Profile() {
  const [isPass, setIsPass] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [show, setShow] = React.useState({ old: false, new: false });
  const [errMessage, setErrMessage] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [formData, setFormData] = React.useState({
    fullName: "Ghaluh Wizard",
    email: "ghaluhwiz@gmail.com",
    phone: "0821603438",
    address: "Griya Bandung Indah",
    oldPassword: "",
    newPassword: "",
  });

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleNewPassword = () => {
    setIsPass((prev) => !prev);
    setFormData((prev) => ({ ...prev, oldPassword: "", newPassword: "" }));
    setErrMessage("");
  };

  const toggleEye = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMessage("");
    setSuccessMsg("");

    const form = new FormData();
    form.append("fullname", formData.fullName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("address", formData.address);

    if (avatar) form.append("picture", avatar);

    if (isPass) {
      if (!formData.oldPassword || !formData.newPassword) {
        setErrMessage("Please fill in both password fields.");
        return;
      }
      form.append("oldPassword", formData.oldPassword);
      form.append("newPassword", formData.newPassword);
    }

    try {
      const res = await http("/users/profile", form, {
        method: "PATCH",
        token: token,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrMessage(data?.message || "Failed to update profile.");
        return;
      }
      dispatch(updateUser(data.result));
      setSuccessMsg("Profile updated successfully!");
      setIsPass(false);
      setFormData((prev) => ({ ...prev, oldPassword: "", newPassword: "" }));
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrMessage("Something went wrong. Please try again.");
    }
  };

  React.useEffect(() => {
    if (!user?.user) return;

    setFormData((prev) => ({
      ...prev,
      fullName: user.user.fullname || "",
      email: user.user.email || "",
      phone: user.user.phone || "",
      address: user.user.address || "",
    }));
  }, [user]);
  const createdAt = user?.user?.Created_at;
  console.log("FULL USER:", user.user);
  console.log(createdAt,"nich");
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 flex justify-center text-3xl font-semibold text-gray-800 lg:relative lg:top-0 lg:justify-start">
          Profile
        </h1>

        {successMsg && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT CARD */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-lg lg:sticky lg:top-20">
            <div className="text-center">
              <div className="relative mx-auto mb-4 h-32 w-32">
                <div className="h-full w-full overflow-hidden rounded-full bg-gray-200 ring-4 ring-orange-100">
                  <img
                    src={
                      preview
                        ? preview
                        : user?.user?.picture
                          ? import.meta.env.VITE_BASE_URL + user.user.picture
                          : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                {formData.fullName}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{formData.email}</p>

              <label
                htmlFor="profile"
                className="mt-6 block cursor-pointer rounded-lg bg-orange-500 px-6 py-2.5 text-center font-medium text-white transition hover:bg-orange-600 active:bg-orange-700"
              >
                Upload New Photo
              </label>
              <input
                type="file"
                id="profile"
                name="picture"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <p className="mt-6 text-center text-sm text-gray-400">
                Member since {formattedDate}
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-2xl bg-white p-8 shadow-lg lg:col-span-2">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-orange-500 transition hover:text-orange-600 hover:underline"
                    onClick={handleNewPassword}
                  >
                    {isPass ? "Cancel" : "Set New Password"}
                  </button>
                </div>

                {isPass ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type={show.old ? "text" : "password"}
                        name="oldPassword"
                        placeholder="Old Password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        onClick={() => toggleEye("old")}
                        className="absolute top-1/2 right-3 -translate-y-1/2"
                      >
                        {show.old ? <EyeOpen /> : <EyeClose />}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={show.new ? "text" : "password"}
                        name="newPassword"
                        placeholder="New Password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        onClick={() => toggleEye("new")}
                        className="absolute top-1/2 right-3 -translate-y-1/2"
                      >
                        {show.new ? <EyeOpen /> : <EyeClose />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <input
                    type="password"
                    value="••••••••"
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-gray-500"
                  />
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Enter your address"
                />
              </div>

              {errMessage && (
                <p className="text-md text-red-500">{errMessage}</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none active:bg-orange-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
