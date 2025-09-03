import { Loader2, Upload } from 'lucide-react'
import React, { Dispatch, FunctionComponent, useState } from 'react'

interface UploadFileProps {
  setResult: Dispatch<React.SetStateAction<any>>
  setError: Dispatch<React.SetStateAction<string | null>>
}

const UploadFile: FunctionComponent<UploadFileProps> = ({ setResult, setError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze(file: File) {
    try {
      setLoading(true);
      setResult(null);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const { url } = await uploadRes.json();

      // Send Cloudinary URL to OpenRouter
      const analyzeRes = await fetch("/api/analyze-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url }),
      });
      const data = await analyzeRes.json();
      if (data?.error) {
        setResult(null)
        setError(data.error);
        return
      }
      const rawContent = data.choices?.[0]?.message?.content;
      const cleanedResult = rawContent
        ?.replace(/\\n/g, "")
        .replace(/\\"/g, '"')
        .trim();

      setResult(JSON.parse(cleanedResult ?? "{}"));
    } catch (err) {
      console.error(err);
      setResult({ food: "Error analyzing image" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="w-full flex flex-col items-center px-4 py-6 bg-green-50 text-green-700 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition">
        <Upload className="w-6 h-6 mb-2" />
        <span className="text-sm font-medium">Click to upload food image</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>

      {file && (
        <p className="text-sm text-gray-600">
          Selected: <span className="font-medium">{file.name}</span>
        </p>
      )}

      <button
        onClick={() => file && handleAnalyze(file)}
        disabled={!file || loading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2 transition"
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Analyze"}
      </button>
    </div>
  )
}

export default UploadFile