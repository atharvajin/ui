import React, { useState } from 'react';
import { ISSUE_CATEGORIES } from '../../data/disputesData';

const ReportIssueModal = ({ isOpen, order, onClose, onSubmit }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleEvidence = (event) => {
    const files = Array.from(event.target.files || []);
    setEvidenceFiles((prev) => [...prev, ...files]);
  };

  const validate = () => {
    const nextErrors = {};
    if (!category) nextErrors.category = 'Choose a reason category.';
    if (description.trim().length < 20) {
      nextErrors.description = 'Please add at least 20 characters of detail.';
    }
    if (evidenceFiles.length === 0) {
      nextErrors.evidence = 'Upload at least one evidence file before freezing escrow.';
    }
    return nextErrors;
  };

  const submit = () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit?.({
      orderId: order?.id,
      category,
      description: description.trim(),
      evidence: evidenceFiles.map((file, idx) => ({
        id: `new-ev-${idx}`,
        name: file.name,
        kind: file.type.startsWith('image') ? 'image' : 'file',
        uploadedBy: 'Buyer',
      })),
      escrowStatus: 'FROZEN',
    });
  };

  return (
    <div className="fixed inset-0 z-[250] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl border border-surface-container shadow-2xl p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-on-surface text-lg">Report an Issue</h3>
            <p className="text-xs text-on-surface-variant">
              Start mediation for order {order?.id}. Escrow will be frozen after submission.
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-on-surface">Reason Category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
            >
              <option value="">Select a category</option>
              {ISSUE_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface">What happened?</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm resize-none"
              placeholder="Share key facts and what solution you are looking for."
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface">Evidence Upload</label>
            <input
              type="file"
              multiple
              onChange={handleEvidence}
              className="mt-1 w-full rounded-xl border border-outline-variant px-3 py-2 text-sm"
            />
            {evidenceFiles.length > 0 && (
              <ul className="mt-2 space-y-1">
                {evidenceFiles.map((file) => (
                  <li key={file.name} className="text-xs text-on-surface-variant">
                    {file.name}
                  </li>
                ))}
              </ul>
            )}
            {errors.evidence && <p className="text-xs text-red-500 mt-1">{errors.evidence}</p>}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-outline-variant text-on-surface-variant text-sm font-bold"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 h-11 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600"
          >
            Freeze Escrow & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportIssueModal;
