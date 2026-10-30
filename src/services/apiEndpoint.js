export const apiEndpoint={
      colleges:       '/api/v1/academics/colleges/',
  departments:    '/api/v1/academics/departments/',
  staff:          '/api/v1/academics/staff/',
  pages:          '/api/v1/core/pages/',
  admissions:     '/api/v1/admissions/info/',
  services:       '/api/v1/services/list/',
  libraries:      '/api/v1/services/library/',
  jobs:           '/api/v1/careers/postings/',
  events:         '/api/v1/news/events/',
  advertisements: '/api/v1/news/announcements/',
  articles:       '/api/v1/news/articles/',
  programs:       '/api/v1/academics/programs/',
  research:       '/api/v1/academics/research/',
    // Dynamic endpoints (functions)
  eventData:   (id) => `/api/v1/news/events/${id}`,
  articleData: (id) => `/api/v1/news/articles/${id}`,
  collegeData: (id)=> `/api/v1/academics/colleges/${id}`
}