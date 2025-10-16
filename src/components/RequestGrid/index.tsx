"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RequestCard } from "@/components/RequestCard";

export function RequestGrid() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setData(data || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (data.length === 0) return <p>Nenhuma submissão encontrada.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data.map((submission) => (
        <RequestCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
}
