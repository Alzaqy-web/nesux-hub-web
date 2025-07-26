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
import useLogin from "../api/useLogin";
import { LoginSchema } from "../schemas";

const FormLogin = () => {
  const { mutateAsync: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to Your Account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
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
              <Button
                type="submit"
                className="w-full bg-orange-500 text-white"
                disabled={isPending}
              >
                {isPending ? "Loading" : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormLogin;
