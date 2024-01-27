export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="min-h-screen mx-auto p-4">
      <div className="flex flex-col gap-4 w-full">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </main>
  );
}
