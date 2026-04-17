import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <LoaderIcon className="text-orange-500 size-12 animate-spin" />
    </div>
  );
}
export default PageLoader;
