import { cn } from "@/lib/utils";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Form({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);
  const { toast } = useToast();
  const isSignup = location.pathname == "/";
  const handlePage = () => {
    navigate(isSignup ? "/login" : "/");
  };

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = isSignup ? "signup" : "login";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setError(
          Array.isArray(data.errors)
            ? data.errors
            : [data.error || data.message]
        );
        return;
      }

      navigate("/quiz");
      console.log("form navigate");
      toast({ title: data.message });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(error);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isSignup ? "Signup" : "Login"}
          </CardTitle>
          <CardDescription>
            Enter your details below to create account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {isSignup && (
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="john123"
                    onChange={handleFormData}
                    value={formData.username}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  onChange={handleFormData}
                  value={formData.email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  value={formData.password}
                />
              </div>
              <div>
                {error &&
                  error?.map((err, index) => (
                    <p key={index} className="text-red-500">
                      {err}
                    </p>
                  ))}
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                {isSignup ? "Signup" : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <a
                className="underline underline-offset-4 cursor-pointer"
                onClick={handlePage}
              >
                {isSignup ? "Login" : "Signup"}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
