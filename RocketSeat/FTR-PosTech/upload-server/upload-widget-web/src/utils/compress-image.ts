interface CompressImageOptions {
  file: File;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

function convertToWebp(filename: string) {
  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return `${filename}.webp`;
  }

  return `${filename.substring(0, lastDotIndex)}.webp`;
}

export function compressImage({
  file,
  maxWidth = Number.POSITIVE_INFINITY,
  maxHeight = Number.POSITIVE_INFINITY,
  quality = 1,
}: CompressImageOptions) {
  const allowedFileExtensions = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedFileExtensions.includes(file.type)) {
    throw new Error("Image format not supported");
  }

  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const compressedImage = new Image();

      compressedImage.onload = () => {
        const canvas = document.createElement("canvas");

        let width = compressedImage.width;
        let height = compressedImage.height;

        //O código abaixo evita com que a imagem sofra distorções
        // fazendo uma alteração proporcional de acordo com o
        // limite de tamanho
        if (width > maxWidth) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context not supported"));
          return;
        }

        ctx.drawImage(compressedImage, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image"));
              return;
            }

            // Sempre ao usar um blob, deve-se utilizar com array
            const compressedFile = new File([blob], convertToWebp(file.name), {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          "image/webp",
          quality
        );
      };

      compressedImage.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
