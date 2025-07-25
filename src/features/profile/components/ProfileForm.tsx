"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useEditProfile from "../api/useEditProfile";

const ProfileForm = () => {
  const { data: session } = useSession();
  const imageRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const { mutateAsync: updateProfile } = useEditProfile(
    Number(session?.user.id),
    session,
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      password: "",
      profilePic: null as File | null,
    },
    onSubmit: async (values) => {
      await updateProfile(values);
    },
  });

  useEffect(() => {
    setIsClient(true);

    if (session?.user?.profilePic) {
      setPreviewImage(session.user.profilePic);
    }
  }, [session]);

  if (status === "loading") return <p>Loading...</p>;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("profilePic", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    formik.setFieldValue("profilePic", null);
    setPreviewImage("");
    if (imageRef.current) imageRef.current.value = "";
  };

  const getValidImageSrc = (src: string | null | undefined) =>
    src && src !== "null" && src !== "" ? src : null;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-6 rounded-2xl border p-4 shadow"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-28 w-28">
          <div className="relative h-full w-full overflow-hidden rounded-full border">
            {isClient && (
              <Image
                src={
                  getValidImageSrc(previewImage) ||
                  getValidImageSrc(session?.user?.profilePic) ||
                  "/default-avatar.jpg"
                }
                alt="Profile Pic"
                fill
                className="object-cover"
              />
            )}
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
          onChange={handleImageChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Jangan diisi jika tidak ingin mengganti password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {session?.user?.referralCode && (
        <div className="grid gap-2">
          <Label htmlFor="referralCode">Referral Code (Unchanged)</Label>
          <Input
            id="referralCode"
            type="text"
            value={session.user.referralCode}
            disabled
            readOnly
          />
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit">
          {formik.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
