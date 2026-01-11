
import React from 'react';

interface ScanUploadProps {
  image: string | null;
  onUpload: (base64: string) => void;
  onRemove: () => void;
}

const ScanUpload: React.FC<ScanUploadProps> = ({ image, onUpload, onRemove }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Upload Medical Scan (Optional)
      </label>
      
      {!image ? (
        <label className="w-full h-40 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300 group-hover:text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-xs text-slate-500 group-hover:text-blue-600">Click to upload X-ray, MRI, or Skin photo</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative w-full h-40 group">
          <img src={image} alt="Scan Preview" className="w-full h-full object-cover rounded-xl border border-slate-200" />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <p className="text-[10px] text-slate-400 italic">Supported formats: JPG, PNG. Max size 5MB.</p>
    </div>
  );
};

export default ScanUpload;
