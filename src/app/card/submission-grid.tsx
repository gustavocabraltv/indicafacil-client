'use client';

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";

type Submission = {
  id: string;
  created_at: string;
  category_id: string | null;
  user_name: string | null;
  user_phone: string | null;
  user_email: string | null;
  form_data: Record<string, any> | null;
};

export function SubmissionsGrid() {
  const [data, setData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      setErr(null);

      const { data, error } = await supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setErr(error.message);
      } else {
        setData((data as Submission[]) || []);
      }
      setLoading(false);
    };

    fetchData();
    // opcional: subscribe em tempo real
    const channel = supabase
      .channel("form_submissions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "form_submissions" },
        () => {
          // refetch simples
          (async () => {
            const { data } = await supabase
              .from("form_submissions")
              .select("*")
              .order("created_at", { ascending: false });
            if (active) setData((data as Submission[]) || []);
          })();
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-neutral-600">
        Carregando submissões…
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700">
        Erro ao carregar: {err}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-sm text-neutral-600">
        Nenhum registro encontrado.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data.map((item) => (
        <SubmissionCard key={item.id} sub={item} />
      ))}
    </div>
  );
}

function SubmissionCard({ sub }: { sub: Submission }) {
  const header = useMemo(() => {
    const dt = new Date(sub.created_at);
    const dateStr = dt.toLocaleString();
    return `${sub.category_id ?? "Sem categoria"} — ${dateStr}`;
  }, [sub.created_at, sub.category_id]);

  const contact = [
    sub.user_name && `Nome: ${sub.user_name}`,
    sub.user_phone && `Telefone: ${sub.user_phone}`,
    sub.user_email && `Email: ${sub.user_email}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-100">
        <h3 className="font-medium">{header}</h3>
        {contact && <p className="text-xs text-neutral-600 mt-1">{contact}</p>}
      </div>

      <div className="p-4 space-y-4">
        <FormDataList formData={sub.form_data || {}} />
      </div>

      <div className="px-4 py-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <span>ID: {sub.id}</span>
        <span>{new Date(sub.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function FormDataList({ formData }: { formData: Record<string, any> }) {
  const entries = Object.entries(formData);

  if (entries.length === 0) {
    return <p className="text-sm text-neutral-500">Sem dados do formulário.</p>;
  }

  return (
    <div className="space-y-3">
      {entries.map(([stepId, fields]) => (
        <div key={stepId} className="rounded-lg border border-neutral-200">
          <div className="px-3 py-2 bg-neutral-50 border-b border-neutral-200">
            <span className="text-xs font-medium text-neutral-700">
              Step: {stepId}
            </span>
          </div>
          <div className="p-3">
            <ul className="space-y-2">
              {Object.entries(fields || {}).map(([fieldId, value]) => (
                <li key={fieldId} className="text-sm">
                  <div className="text-[11px] uppercase tracking-wide text-neutral-500">
                    {fieldId}
                  </div>
                  <div className="font-medium break-words">
                    {formatValue(value)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatValue(v: any) {
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "object" && v !== null) return JSON.stringify(v);
  if (v === "" || v === null || v === undefined) return "—";
  return String(v);
}
