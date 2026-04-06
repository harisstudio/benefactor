export default function CheckoutLoading() {
  return (
    <div className="py-8 md:py-12">
      <div className="max-w-[648px] mx-auto px-5 animate-pulse">
        <div className="bg-gray-200 rounded-md h-[600px]" />
        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="h-6 w-28 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
