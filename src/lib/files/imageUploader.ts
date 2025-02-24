// imageUploader.ts

interface UploadResponse {
  message: string;
  fileId: string;
  fileUrl: string;
}

interface UploadError {
  error: string;
  fileName: string;
}

type UploadResult = UploadResponse | UploadError;

// Function to upload multiple images and return their URLs
async function uploadImages(images: FileWithPreview[]): Promise<string[]> {
  const uploadResults: UploadResult[] = [];
  const apiUrl = "http://34.31.113.2/api/v1.0.0/files";

  // Upload each image sequentially
  for (const image of images) {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data: UploadResponse = await response.json();
      uploadResults.push(data);
    } catch (error) {
      uploadResults.push({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        fileName: image.name,
      });
    }
  }

  // Filter successful uploads and return their URLs
  const successfulUploads = uploadResults.filter(
    (result): result is UploadResponse => "fileUrl" in result,
  );

  return successfulUploads.map((result) => result.fileUrl);
}

export default uploadImages;

//   // Example usage in a React component
//   const ImageUploadExample: React.FC = () => {
//     const [imageLinks, setImageLinks] = React.useState<string[]>([]);
//     const [isLoading, setIsLoading] = React.useState(false);

//     const handleFilesUpload = async (files: FileList | null) => {
//       if (!files) return;

//       setIsLoading(true);
//       const fileArray = Array.from(files);
//       const urls = await uploadImages(fileArray);
//       setImageLinks(urls);
//       setIsLoading(false);
//     };

//     return (
//       <div className="p-4">
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => handleFilesUpload(e.target.files)}
//           className="mb-4"
//         />
//         {isLoading && <p>Uploading...</p>}
//         {imageLinks.length > 0 && (
//           <div>
//             <h3>Uploaded Image Links:</h3>
//             <ul>
//               {imageLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link} target="_blank" rel="noopener noreferrer">
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   };
