
import React from 'react';

interface SymptomFormProps {
  value: string;
  onChange: (val: string) => void;
}

const SymptomForm: React.FC<SymptomFormProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Describe Your Symptoms
      </label>
      <textarea
        className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-slate-700 placeholder:text-slate-400"
        placeholder="e.g., I've had a dry cough for 3 days, chest tightness, and a fever of 101F. It hurts when I take deep breaths."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {['Fever', 'Cough', 'Shortness of Breath', 'Pain'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(value ? `${value}, ${tag}` : tag)}
            className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
          >
            + {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SymptomForm;
