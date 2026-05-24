import { useState, useRef } from 'react';
import { Upload, FileText, Image, File, Download, Trash2 } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'other';
  size: string;
  date: string;
  trip: string;
}

const initialDocuments: Document[] = [
  { id: 1, name: 'Passport - Melvin Lu.pdf', type: 'pdf', size: '2.4 MB', date: '2026-04-15', trip: 'Madrid Trip' },
  { id: 2, name: 'Flight Booking Confirmation.pdf', type: 'pdf', size: '1.1 MB', date: '2026-05-01', trip: 'Madrid Trip' },
  { id: 3, name: 'Hotel Reservation - Palacio.pdf', type: 'pdf', size: '856 KB', date: '2026-05-02', trip: 'Madrid Trip' },
  { id: 4, name: 'Travel Insurance.pdf', type: 'pdf', size: '3.2 MB', date: '2026-05-03', trip: 'Madrid Trip' },
  { id: 5, name: 'Schengen Visa - Family.jpg', type: 'image', size: '4.5 MB', date: '2026-04-20', trip: 'Madrid Trip' },
  { id: 6, name: 'Itinerary Export.pdf', type: 'pdf', size: '1.8 MB', date: '2026-05-10', trip: 'Madrid Trip' },
];

const fileIcons = {
  pdf: <FileText size={20} style={{ color: '#B85C50' }} />,
  image: <Image size={20} style={{ color: '#6E8B65' }} />,
  other: <File size={20} style={{ color: '#9C8E84' }} />,
};

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In real app, would upload files here
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const deleteDocument = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: '#2D1F14' }}>Documents</h1>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: '#9C8E84' }}>
          PASSPORTS &middot; BOOKINGS &middot; VISAS
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className="rounded-2xl p-8 mb-8 text-center cursor-pointer transition-all duration-200"
        style={{
          backgroundColor: isDragging ? 'rgba(198,123,92,0.08)' : '#FAF8F5',
          border: isDragging ? '2px dashed #C67B5C' : '2px dashed #D9D4CF',
          boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
        }}
      >
        <input ref={fileInputRef} type="file" multiple className="hidden" />
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ backgroundColor: 'rgba(198,123,92,0.1)' }}
        >
          <Upload size={22} style={{ color: '#C67B5C' }} />
        </div>
        <p className="text-sm font-medium mb-1" style={{ color: '#2D1F14' }}>
          Drop files here or click to upload
        </p>
        <p className="text-[12px]" style={{ color: '#9C8E84' }}>
          PDF, JPG, PNG up to 10MB each
        </p>
      </div>

      {/* Document List */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#FAF8F5',
          boxShadow: '0 4px 12px rgba(45,31,20,0.05)',
        }}
      >
        {/* Table Header */}
        <div
          className="grid grid-cols-[1fr_100px_100px_120px_100px] gap-4 px-5 py-3 text-[10px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: '#9C8E84', borderBottom: '1px solid #E8E0D8' }}
        >
          <span>Name</span>
          <span>Size</span>
          <span>Type</span>
          <span>Date</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Documents */}
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="grid grid-cols-[1fr_100px_100px_120px_100px] gap-4 px-5 py-3 items-center transition-colors duration-200"
            style={{ borderBottom: '1px solid #E8E0D8' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(198,123,92,0.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <div className="flex items-center gap-3">
              {fileIcons[doc.type]}
              <div>
                <p className="text-sm font-medium" style={{ color: '#2D1F14' }}>{doc.name}</p>
                <p className="text-[11px]" style={{ color: '#9C8E84' }}>{doc.trip}</p>
              </div>
            </div>
            <span className="text-[13px]" style={{ color: '#6B5B4E' }}>{doc.size}</span>
            <span className="text-[11px] font-medium uppercase" style={{ color: '#9C8E84' }}>{doc.type}</span>
            <span className="text-[13px]" style={{ color: '#6B5B4E' }}>{doc.date}</span>
            <div className="flex items-center justify-end gap-2">
              <button
                className="p-1.5 rounded transition-colors duration-200"
                style={{ color: '#9C8E84' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#C67B5C'; e.currentTarget.style.backgroundColor = 'rgba(198,123,92,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9C8E84'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <Download size={14} />
              </button>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="p-1.5 rounded transition-colors duration-200"
                style={{ color: '#9C8E84' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#B85C50'; e.currentTarget.style.backgroundColor = 'rgba(184,92,80,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9C8E84'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: '#9C8E84' }}>No documents uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
