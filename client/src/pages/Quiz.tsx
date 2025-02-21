import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Quiz() {
  return (
    <Layout>
      <div className="container mx-5 py-10">
        <h1 className="text-3xl font-bold mb-6">My Quizzes</h1>
      </div>
    </Layout>
  );
}
