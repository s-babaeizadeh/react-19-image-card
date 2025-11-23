import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ImageSkeleton = () => {
  return (
    <Card className="w-[380px] animate-in fade-in-50 duration-200">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full aspect-[5/4] rounded-md" />
      </CardContent>
    </Card>
  );
}

export default ImageSkeleton