import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ImageSkeleton from "@/components/ImageSkeleton";

type ImageData = {
  id: number;
  url: string;
  title: string;
};

export const Route = createFileRoute("/tanstack-query")({
  ssr: false,
  component: App,
});

async function fetchImage(id: number): Promise<ImageData> {
  await new Promise((r: any) => setTimeout(r, 800));
  return { id, url: `/images/${id}.jpg`, title: `Image ${id}` };
}

function App() {
  const [imageId, setImageId] = useState(1);
  const { data: imageData, isPending } = useQuery<ImageData>({
    queryKey: ["imageData", imageId],
    queryFn: () => fetchImage(imageId),
  });

  return (
    <div className="flex flex-col justify-center items-center text-black p-4 h-screen gap-6">
      <Button size="lg"
      className="bg-[#8ECAE6] text-white px-4 py-2 rounded-md hover:bg-[#219EBC] font-bold text-2xl disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed" 
          onClick={() => setImageId(imageId + 1)}>Next Image</Button>
      {imageData && !isPending && <Image image={imageData!} />}
      {isPending && <ImageSkeleton />}
    </div>
  );
}



function Image({ image }: { image: ImageData }) {
  return (
    <Card className="w-[380px] mt-10">
      <CardHeader>
        <CardTitle>{image.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={image.url}
          alt={image.title}
          className="w-full aspect-[5/4] object-contain rounded-md"
        />
      </CardContent>
    </Card>
  );
}


