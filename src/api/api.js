import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const client = axios.create({ baseURL: BASE_URL })

// Attach the auth token to every request automatically
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('Lakshya_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// If the backend ever says our session is invalid/expired, don't keep firing
// doomed requests silently - clear local auth state and bounce back to login.
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('Lakshya_token')
      localStorage.removeItem('Lakshya_name')
      localStorage.removeItem('Lakshya_email')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  signup: (data) => client.post('/auth/signup', data).then((r) => r.data),
  login: (data) => client.post('/auth/login', data).then((r) => r.data),
  google: (idToken) => client.post('/auth/google', { idToken }).then((r) => r.data),
  sendSignupOtp: (data) => client.post('/auth/signup/otp/send', data).then((r) => r.data),
  verifySignupOtp: (data) => client.post('/auth/signup/otp/verify', data).then((r) => r.data),
  sendLoginOtp: (email) => client.post('/auth/login/otp/send', { email }).then((r) => r.data),
  verifyLoginOtp: (data) => client.post('/auth/login/otp/verify', data).then((r) => r.data),
}

export const resumeApi = {
  upload: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return client.post('/resume/upload', formData).then((res) => res.data)
  },
  getSkills: () => client.get('/resume/skills').then((res) => res.data),
  download: () =>
    client.get('/resume/download', { responseType: 'blob' }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      window.open(url, '_blank')
    }),
}

export const jobsApi = {
  search: (filters) => client.post('/jobs/search', filters).then((r) => r.data),
  formatDescription: (job) =>
    client
      .post('/jobs/format', {
        title: job.title,
        description: job.description,
        location: job.location,
        workMode: job.workMode,
        salary: job.salary,
      })
      .then((r) => r.data),
  translateTitle: (title) =>
    client
      .post('/jobs/translate-title', { title })
      .then((r) => r.data.translatedTitle)
      .catch(() => null), // on-demand + best-effort - just keep the original title if this fails
}

export const userApi = {
  getProfile: () => client.get('/user/profile').then((r) => r.data),
}

export const applicationsApi = {
  record: (job) =>
    client
      .post('/applications', {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        source: job.source,
        applyUrl: job.applyUrl,
      })
      .then((r) => r.data)
      .catch(() => null),
  list: () => client.get('/applications').then((r) => r.data),
  updateStatus: (id, status) =>
    client
      .patch(`/applications/${id}`, { status })
      .then((r) => r.data)
      .catch(() => null),
}

export default client