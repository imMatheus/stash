import React, { useState } from "react";
import type { NextPage } from "next";
import { Eye, EyeOff } from "react-feather";
import { Alert, AlertDescription, AlertTitle } from "~/ui/components/Alert";
import { Button } from "~/ui/components/Button";
import { useLogin } from "~/graphql/auth/useLogin";

const LoginPage: NextPage = () => {
  const [inputStates, setInputStates] = useState({
    email: {
      value: "",
    },
    password: {
      value: "",
      showPassword: false,
    },
  });
  const [loginMutation, { loading, error }] = useLogin();

  async function handleLogin() {
    console.log("doing sin up");

    try {
      await loginMutation({
        variables: {
          params: {
            email: inputStates.email.value,
            password: inputStates.password.value,
          },
        },
      });
    } catch (error) {
      console.log("shit hit the fan ");
    }
  }

  const EyeIcon = inputStates.password.showPassword ? Eye : EyeOff;

  return (
    <div className="px-10 py-14">
      <div>
        <h1 className="text-center text-3xl font-black">Login</h1>
        <form
          className="mx-auto mt-10 max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-5">
            <label htmlFor="sign-up-email-input" className="text-gray-500">
              Email
            </label>
            <div className="mt-1 flex items-center rounded-md border px-2.5 py-1.5 focus-within:border-primary">
              <input
                id="sign-up-email-input"
                type="email"
                autoComplete="email"
                placeholder="email@xyz.com"
                className="w-full outline-none"
                value={inputStates.email.value}
                onChange={(event) => {
                  setInputStates((c) => {
                    c.email.value = event.target.value;
                    return { ...c };
                  });
                }}
              />
            </div>
          </div>

          <label className="mb-3" htmlFor="sign-up-password-input">
            <h3 className="text-gray-500">Password</h3>
            <div className="mt-1 flex items-center rounded-md border px-2.5 py-1.5 focus-within:border-primary">
              <input
                id="sign-up-password-input"
                type={inputStates.password.showPassword ? "text" : "password"}
                placeholder="password"
                autoComplete="current-password"
                className="mr-1 w-full outline-none"
                value={inputStates.password.value}
                onChange={(event) => {
                  setInputStates((c) => {
                    c.password.value = event.target.value;
                    return { ...c };
                  });
                }}
              />
              <EyeIcon
                className="h-5 w-5 cursor-pointer text-gray-400"
                onClick={() => {
                  const toggledState = !inputStates.password.showPassword;
                  setInputStates((c) => {
                    console.log(inputStates);
                    console.log(toggledState);

                    c.password.showPassword = toggledState;
                    return { ...c };
                  });
                }}
              />
            </div>
          </label>

          <div className="mt-4 flex justify-end">
            <Button variant="default" type="submit">
              {loading ? "Loading.." : "Login"}
            </Button>
          </div>
          {error && (
            <Alert variant="error" className="mt-4">
              <AlertTitle>Could not Login!</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
