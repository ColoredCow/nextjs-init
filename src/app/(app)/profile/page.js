"use client";

import { useState, useRef } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import { useAuth } from "@/hooks/auth";
import { showToast } from "@/components/ToastProvider";

export default function ProfilePage() {
  const { user, updateProfile, updatePassword } = useAuth({
    middleware: "auth",
  });

  const [name, setName] = useState(user?.name || "");
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const submitProfileForm = async (event) => {
    event.preventDefault();
    try {
      await updateProfile({
        name,
        email: user?.email,
        setErrors,
      });
      setDisplayName(name);
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
      showToast("Update failed. Please check errors.", "error");
    }
  };

  const submitSecurityForm = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setErrors({
        password_confirmation: ["The password confirmation does not match."],
      });
      return;
    }

    try {
      await updatePassword({
        password,
        password_confirmation: passwordConfirmation,
        setErrors,
      });

      showToast("Password updated successfully!", "success");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        showToast("Failed to update password. Please try again.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Section */}
        <header className="rounded-xl bg-white p-6 text-gray-900 shadow-lg">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="relative flex-shrink-0">
              <img
                src={user?.profilePicture || "/profileImage.png"}
                alt="Profile"
                className="h-20 w-20 rounded-full border-4 border-white object-cover sm:h-24 sm:w-24"
              />
              <button
                className="absolute bottom-0 right-0 rounded-full bg-white p-2 text-gray-900 transition-colors hover:bg-gray-100"
                aria-label="Upload new profile picture"
              ></button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold sm:text-3xl">{displayName}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </header>

        {/* Personal Information Section */}
        <section className="rounded-xl bg-white p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <form onSubmit={submitProfileForm} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
              <InputError messages={errors.name} />
            </div>
            <Button type="submit">Save Profile</Button>
          </form>
        </section>

        {/* Security Settings Section */}
        <section className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
          <form onSubmit={submitSecurityForm} className="space-y-6">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
              <InputError messages={errors.password} />
            </div>
            <div>
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="w-full"
              />
              <InputError messages={errors.password_confirmation} />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </section>
      </div>
    </div>
  );
}
