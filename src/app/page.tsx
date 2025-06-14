import ChartWithDetails from "@/components/ChartWithDetails";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <ChartWithDetails />
      <ChartWithDetails />
    </div>
  );
}
