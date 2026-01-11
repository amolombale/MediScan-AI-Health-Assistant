
import React, { useState } from 'react';
import { AppState, DiagnosisResult } from './types';
import { analyzeHealthData } from './services/geminiService';
import Header from './components/Header';
import SymptomForm from './components/SymptomForm';
import ScanUpload from './components/ScanUpload';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    symptoms: '',
    image: null,
    result: null,
    loading: false,
    error: null,
  });

  const handleAnalyze = async () => {
    if (!state.symptoms.trim()) {
      setState(prev => ({ ...prev, error: 'Please describe your symptoms first.' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null, result: null }));
    
    try {
      const diagnosis = await analyzeHealthData(state.symptoms, state.image);
      setState(prev => ({ ...prev, result: diagnosis, loading: false }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({ ...prev, error: 'Failed to analyze data. Please try again.', loading: false }));
    }
  };

  const reset = () => {
    setState({
      symptoms: '',
      image: null,
      result: null,
      loading: false,
      error: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xl font-semibold text-slate-800">Health Assessment</h2>
            <p className="text-sm text-slate-500 mt-1">Provide your symptoms and any relevant medical scans for a preliminary AI analysis.</p>
          </div>

          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SymptomForm 
                value={state.symptoms} 
                onChange={(val) => setState(prev => ({ ...prev, symptoms: val }))} 
              />
              <ScanUpload 
                image={state.image} 
                onUpload={(base64) => setState(prev => ({ ...prev, image: base64 }))}
                onRemove={() => setState(prev => ({ ...prev, image: null }))}
              />
            </div>

            {state.error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {state.error}
              </div>
            )}

            <div className="flex justify-center pt-4">
              <button
                onClick={handleAnalyze}
                disabled={state.loading}
                className={`
                  px-8 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 active:scale-95
                  ${state.loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'}
                `}
              >
                {state.loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : 'Run AI Diagnostic'}
              </button>
            </div>
          </div>
        </div>

        {state.result && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultDisplay result={state.result} onReset={reset} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
