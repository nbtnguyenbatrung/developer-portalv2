"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useTranslations} from "use-intl";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email format.",
    })
    .min(1, {
      message: "Email is required.",
    })
    .max(50, {
      message: "Email must be maximum 50 characters.",
    }),
  password: z
    .string()
    .min(1, {
      message: "Password is required.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      }
    ),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const t = useTranslations("common")
  const tn = useTranslations("navigation")
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("callbackUrl") || "/";
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    setError("");
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        setError("Invalid email or password");
        return;
      }
      router.push(redirectPath);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollToContact = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const el = document.getElementById("footer");
      el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleSubmit(data))}
        className="mx-auto my-auto"
      >
        <div className="container flex items-center justify-center py-12 md:py-24">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">{t("login")}</CardTitle>
              <CardDescription>
                  {t("descriptionLogin")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {error && (
                  <div className="text-red-500 text-sm font-medium text-left">
                    {error}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>{t("password")}</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline font-normal"
                        >
                            {t("forgotPassword")}
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("password")}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("loginLoading")}
                    </>
                  ) : (
                      <>{t("login")}</>
                  )}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                  {t("notAccount")}?{" "}
                <Link href="#"
                      onClick={handleScrollToContact}
                      className="text-primary hover:underline">
                    {tn("contactSupport")}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
