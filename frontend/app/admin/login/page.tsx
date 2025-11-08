"use client";

import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gov-maroon-50 via-white to-gov-navy-50 p-2 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gov-maroon-500 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-serif">
            Admin Login
          </CardTitle>
          <CardDescription>GIS Solutions - Government Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gov-maroon-500 hover:bg-gov-maroon-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-gov-gray-500">
              <p>Authorized personnel only</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
