import axios from "axios";

const API_URL = "http://localhost:3333";

interface UploadFileToStorageProps {
  file: File;
  onProgress: (sizeInBytes: number) => void;
}

interface UploadFileToStorageOpts {
  signal?: AbortSignal;
}

export async function uploadFileToStorage(
  { file, onProgress }: UploadFileToStorageProps,
  opts?: UploadFileToStorageOpts
) {
  const data = new FormData();

  data.append("file", file);

  const response = await axios.post<{ url: string }>(
    `${API_URL}/uploads`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: opts?.signal,
      onUploadProgress: (progressEvent) => {
        onProgress(progressEvent.loaded); // Quantos bytes já foram enviados para o back end
      },
    }
  );

  return { url: response.data.url };
}
