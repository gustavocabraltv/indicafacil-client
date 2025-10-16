"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { RequestCard } from "@/components/RequestCard";

type FormDataValue = string | number | boolean | string[] | null | undefined;
type FormFieldsData = Record<string, FormDataValue>;
type FormData = Record<string, FormFieldsData>;

type Submission = {
  id: string;
  created_at: string;
  category_id: string | null;
  user_name?: string | null;
  user_phone?: string | null;
  user_email?: string | null;
  form_data?: FormData | string | null;
};

export function RequestGrid() {
  const [data, setData] = useState<Submission[]>([]);
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
        setData((data as Submission[]) || []);
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