import React, { useState } from 'react';
import { 
  Calendar, 
  Droplets, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Loader
} from 'lucide-react';
import { mockApi } from '../api/mockApi';

export function DataInput() {
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    usage: '',
    notes: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setExtractedData(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await mockApi.submitUsage({
        usage: parseInt(formData.usage),
        year: formData.year,
        notes: formData.notes
      });
      
      setMessage({ type: 'success', text: 'Usage data submitted successfully!' });
      setFormData({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        usage: '',
        notes: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit data. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const processBill = async () => {
    if (!file) return;

    setOcrLoading(true);
    try {
      const result = await mockApi.processBill(file);
      setExtractedData(result);
      setFormData({
        ...formData,
        usage: result.usage.toString(),
        month: new Date().getMonth() + 1, // Simplified for demo
        year: result.year
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to process bill. Please try again.' });
    } finally {
      setOcrLoading(false);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add Usage Data</h1>
        <p className="text-gray-600 mt-2">Manually enter your water usage or upload a bill for automatic processing</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manual Entry Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Droplets className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Manual Entry</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                  Month
                </label>
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="2020"
                  max="2030"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-2">
                Water Usage (Liters)
              </label>
              <input
                type="number"
                id="usage"
                name="usage"
                value={formData.usage}
                onChange={handleInputChange}
                required
                placeholder="Enter your water usage in liters"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any additional notes about your usage..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Submitting...' : 'Submit Data'}
            </button>
          </form>
        </div>

        {/* Bill Upload */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Upload className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Bill Upload</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Water Bill (PDF or Image)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <FileText className="h-12 w-12 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500">
                    PDF, JPG, PNG up to 10MB
                  </span>
                </label>
              </div>
              {file && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <button
              onClick={processBill}
              disabled={!file || ocrLoading}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {ocrLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Processing Bill...</span>
                </div>
              ) : (
                'Process Bill'
              )}
            </button>

            {extractedData && (
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Extracted Data:</h3>
                <div className="space-y-1 text-sm text-green-700">
                  <p><strong>Usage:</strong> {extractedData.usage} liters</p>
                  <p><strong>Month:</strong> {extractedData.month}</p>
                  <p><strong>Year:</strong> {extractedData.year}</p>
                </div>
                <p className="text-xs text-green-600 mt-2">
                  Data has been automatically filled in the form above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}