"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import useRegister from "../api/useRegister";
import { RegisterSchema } from "../schemas";

const FormRegisterEO = () => {
  const { mutateAsync: register, isPending } = useRegister();

  type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    referredBy: string;
    role: "EO" | "customer"; // tambahkan ini
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      referredBy: "",
      role: "EO",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <div className="mt-10 flex justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register Your Account</CardTitle>
          <CardDescription>
            Enter your data below to Register a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="relative mb-2 grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  required
                />
                {!!formik.touched.name && !!formik.errors.name && (
                  <p className="absolute -bottom-5 text-xs text-red-500">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div className="relative mb-2 grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />
                {!!formik.touched.email && !!formik.errors.email && (
                  <p className="absolute -bottom-5 text-xs text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="relative mb-2 grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  required
                />
                {!!formik.touched.password && !!formik.errors.password && (
                  <p className="absolute -bottom-5 text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Loading" : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormRegisterEO;
