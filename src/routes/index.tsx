import { Suspense, use, useTransition, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import ImageSkeleton from "@/components/ImageSkeleton";

type ImageData = {
  id: number;
  url: string;
  title: string;
};

export const Route = createFileRoute("/")({
  ssr: false,
  component: App,
});

// Fake async fetch
async function fetchImage(id: number): Promise<ImageData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { id, url: `/images/${id}.jpg`, title: `Image ${id}` };
}

function App() {
  const [imageId, setImageId] = useState(1);
  const [imageDataPromise, setImageDataPromise] = useState<Promise<ImageData>>(
    () => fetchImage(imageId)
  );

  const nextImage = () => {
    const newId = imageId + 1;
    setImageId(newId);
    setImageDataPromise(fetchImage(newId));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 h-screen bg-background">
      <LoadableButton onClick={nextImage}>Next Image</LoadableButton>

      <Suspense fallback={<ImageSkeleton />}>
        <Image imageDataPromise={imageDataPromise} />
      </Suspense>
    </div>
  );
}

function Image({ imageDataPromise }: { imageDataPromise: Promise<ImageData> }) {
  const image = use(imageDataPromise);
  return (
    <Card className="w-[380px] mt-10 animate-in fade-in-50 duration-200">
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



function LoadableButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={() => startTransition(onClick)}
      variant="default"
      size="lg"
      className="bg-[#8ECAE6] text-white px-4 py-2 rounded-md hover:bg-[#219EBC] font-bold text-2xl disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
    >
      {children}
    </Button>
  );
}
