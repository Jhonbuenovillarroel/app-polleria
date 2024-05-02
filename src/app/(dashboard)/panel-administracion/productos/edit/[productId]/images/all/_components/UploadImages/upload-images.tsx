import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Image, Loader2 } from "lucide-react";
import { product } from "@prisma/client";
import toast from "react-hot-toast";
import result from "postcss/lib/result";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  product: product | null;
}

const UploadImages = ({ product }: Props) => {
  const router = useRouter();
  const [uploadingImages, setUploadingImages] = useState(false);
  return (
    <div>
      <CldUploadWidget
        options={{
          folder: `${
            process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER
          }/productos/${product?.name.split("/").join("-")}`,
          maxFiles: 6,
          multiple: true,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        }}
        onError={(result, { widget, close }) => {
          toast.error("Ocurrió un error durante el proceso");
          widget.close();
        }}
        onQueuesEnd={async (result, { widget }) => {
          // @ts-ignore
          const images = result.info.files.map((file) => ({
            url: file.uploadInfo.secure_url,
            public_id: file.uploadInfo.public_id,
          }));
          try {
            const { data } = await axios.post(
              "/api/products/api/add-uploaded-images",
              { images, id: product?.id }
            );

            if (data.ok) {
              toast.success("Imagenes subidas correctamente");
              router.refresh();
            }
          } catch (error) {
            toast.error("Algo salió mal vuelve a intentarlo");
          }
          setTimeout(() => {
            setUploadingImages(false);
          }, 1200);
          widget.close();
        }}
        onQueuesStart={(result, { widget }) => {
          setUploadingImages(true);
        }}
        signatureEndpoint="/api/cloudinary/api/sign-cloudinary-params"
      >
        {({ open }) => {
          return (
            <Button
              variant={"outline"}
              className="flex items-center gap-2 h-11"
              onClick={() => open()}
              disabled={uploadingImages}
            >
              {uploadingImages ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Cargando...</span>
                </>
              ) : (
                <>
                  <Image className="w-3 h-3" strokeWidth={1.5} />
                  <span>Subir Imágenes</span>
                </>
              )}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImages;
