"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useUploadProfilePic } from "../api/useUploadProfilePic";

const ProfileForm = () => {
  const { data: session, status } = useSession();
  const { mutateAsync: uploadProfilePic } = useUploadProfilePic();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
    referralCode: "",
    points: 0,
  });

  console.log("ini isi form", form);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      setForm({
        name: session.user.name || "",
        email: session.user.email || "",
        password: "",
        profilePic: session.user.profilePic || "",
        referralCode: session.user.referralCode || "",
        points: session.user.points || 0,
      });
      setSelectedImage(session.user.profilePic || "");
    }
  }, [session]);

  if (status === "loading") return <p>Loading...</p>;

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProfilePic(null);
    setSelectedImage("");
    if (imageRef.current) imageRef.current.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (profilePic) {
        const res = await uploadProfilePic(profilePic);
        console.log("📦 Upload response:", res);

        if (!res || !res.imageUrl) {
          throw new Error(
            "Upload berhasil tapi tidak menerima imageUrl dari server",
          );
        }

        imageUrl = res.imageUrl;
        setSelectedImage(imageUrl);
      }

      const updateRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password || undefined,
          }),
        },
      );
      // await update({
      //   ...session,
      //   user: {
      //     ...session?.user,
      //     name: form.name,
      //     email: form.email,
      //     profilePic: imageUrl || session?.user.profilePic,
      //   },
      // });

      // if (!updateRes.ok) {
      //   const errBody = await updateRes.json();
      //   throw new Error(errBody.message || "Update profile failed");
      // }

      alert("Profile saved!");
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Upload gagal: " + (err as Error).message);
    }
  };

  const getValidImageSrc = (src: string | null | undefined) => {
    return src && src !== "null" && src !== "" ? src : null;
  };
  console.log(getValidImageSrc(session?.user.profilePic));
  console.log(session?.user);
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-6 rounded-2xl border p-4 shadow"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-28 w-28">
          <div className="relative h-full w-full overflow-hidden rounded-full border">
            <Image
              src={
                getValidImageSrc(selectedImage) ||
                getValidImageSrc(form.profilePic) ||
                getValidImageSrc(session?.user?.profilePic) ||
                "https://avatar.iran.liara.run/public/10"
              }
              alt="Profile Pic"
              fill
              className="object-cover"
            />
          </div>

          <Button
            type="button"
            onClick={removeImage}
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 z-10 rounded-full"
          >
            <Trash size={16} />
          </Button>
        </div>

        <Input
          type="file"
          ref={imageRef}
          accept="image/*"
          onChange={onChangeImage}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Jangan diisi jika tidak ingin mengganti password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="referralCode">Your Referral Code</Label>
        <Input
          id="referralCode"
          name="referralCode"
          value={form.referralCode}
          readOnly
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
