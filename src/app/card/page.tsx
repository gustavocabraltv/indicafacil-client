import Wrapper from "@/components/Wrapper";
import { RequestGrid } from "@/components/RequestGrid";

export default function CardPage() {
  return (
    <div className="bg-[#F5F5F2] min-h-dvh py-10">
      <Wrapper>
        <h1 className="text-2xl font-semibold mb-6">Submissões</h1>
        <RequestGrid />
      </Wrapper>
    </div>
  );
}
