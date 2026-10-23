export const apiEndpoint={
      colleges:       '/academics/colleges/',
  departments:    '/academics/departments/',
  staff:          '/academics/staff/',
  pages:          '/core/pages/',
  admissions:     '/admissions/info/',
  services:       '/services/list/',
  libraries:      '/services/library/',
  jobs:           '/careers/postings/',
  events:         '/news/events/',
  advertisements: '/news/announcements/',
  articles:       '/news/articles/',
  programs:       '/academics/programs/',
  research:       '/academics/research/',
    // Dynamic endpoints (functions)
  eventData:   (id) => `/news/events/${id}`,
  articleData: (id) => `/news/articles/${id}`,
  collegeData: (id)=> `/academics/colleges/${id}`
}