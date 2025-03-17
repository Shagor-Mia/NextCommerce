import { getCurrentSession, loginUser } from "@/actions/auth";

import { redirect } from "next/navigation";
import { z } from "zod";
import React from "react";
import SignIn from "@/components/auth/SignIn";

const SignIpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

const SignInPage = async () => {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  const action = async (prevState: any, formData: FormData) => {
    "use server";
    const parsed = SignIpSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return {
        message: "Invalid form data",
      };
    }

    const { email, password } = parsed.data;
    const { user, error } = await loginUser(email, password);
    if (error) {
      return { message: error };
    } else if (user) {
      await loginUser(email, password);
      return redirect("/");
    }
  };

  return <SignIn action={action} />;
};

export default SignInPage;
