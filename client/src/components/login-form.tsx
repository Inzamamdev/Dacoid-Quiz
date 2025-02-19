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
  const isSignup = location.pathname == "/";
  const handlePage = () => {
    navigate(isSignup ? "/login" : "/");
  };

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);
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
          <form>
            <div className="flex flex-col gap-6">
              {isSignup && (
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="john123"
                    required
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
                  required
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
                  required
                  onChange={handleFormData}
                  value={formData.password}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
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
