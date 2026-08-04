import React, { useRef, useState } from 'react'
import { resumeApi } from '../api/api.js'

export default function ResumeUpload({ onParsed, hasExistingResume }) {
  const fileRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.')
      return
    }
    setError('')
    setUploading(true)
    try {
      const res = await resumeApi.upload(file)
      setFileName(file.name)
      onParsed(res.skills || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not process this resume. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="resume-drop" htmlFor="resume-input">
        <div className="icon">📄</div>
        <div className="label">
          {uploading ? 'Parsing resume…' : fileName ? 'Replace resume' : 'Upload / update resume'}
        </div>
        <div className="hint">PDF only, up to 10MB</div>
        <input
          id="resume-input"
          type="file"
          accept="application/pdf"
          ref={fileRef}
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </label>

      {error && <div className="banner-error" style={{ marginTop: 12 }}>{error}</div>}

      {fileName && !uploading && (
        <div className="resume-status">
          <span className="dot" /> {fileName} uploaded successfully
        </div>
      )}

      {(fileName || hasExistingResume) && !uploading && (
        <button
          type="button"
          className="view-resume-btn"
          onClick={() => resumeApi.download()}
        >
          📄 View my resume
        </button>
      )}
    </div>
  )
}
