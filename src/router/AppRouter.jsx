import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy} from 'react';

import WebsiteLayout from '../layout/WebsiteLayout/WebsiteLayout';
import Error from "../pages/Error/Error";
// ─── University ───────────────────────────────────────────
const Home = lazy(() => import('../pages/Home/Home'));
const AboutUniversity = lazy(() => import('../pages/AboutUniversity/AboutUniversity'));
const Vision = lazy(() => import('../pages/Vision/Vision'));

// ─── Services ─────────────────────────────────────────────
const ServicesWebsite = lazy(() => import('../pages/Services/ServicesWebsite'));
const LibraryWebsite = lazy(() => import('../pages/Library/LibraryWebsite'));

// ─── News ─────────────────────────────────────────────────
const AdvertisementsWebsite = lazy(() => import('../pages/Advertisements/AdvertisementsWebsite'));
const Articles = lazy(() => import('../pages/Articles/Articles'));
const ArticlesDetails = lazy(() => import('../pages/ArticlesDetails/ArticlesDetails'));
const EventsWebsite = lazy(() => import('../pages/Events/EventsWebsite'));
const EventDeatils = lazy(() => import('../pages/EventDetails/EventDetails'));

// ─── Academics ────────────────────────────────────────────
const Colleges = lazy(() => import('../pages/Colleges/Colleges'));
const CollegeDetails=lazy(()=>import('../pages/Colleges/CollegeDetails/CollegeDetails'))
const DepartmentWebsite = lazy(() => import('../pages/Departments/DepartmentWebsite'));
const ProgramWebsite = lazy(() => import('../pages/Program/ProgramWebsite'));
const StaffWebsite = lazy(() => import('../pages/StaffWebsite/StaffWebsite'));

// ─── Careers & Admission ──────────────────────────────────
const JobPostingWebsite = lazy(() => import('../pages/JobPosting/JobPostingWebsite'));
const StudentWebsite = lazy(() => import('../pages/Students/StudentWebsite'));
const StudentGuide = lazy(() => import('../pages/Students/StudentGuide/StudentGuide'));
const StudentServices = lazy(() => import('../pages/Students/StudentServices/StudentServices'));
const ExamInstructions = lazy(() => import('../pages/Students/ExamInstructions/ExamInstructions'));
const Application = lazy(() => import('../pages/ApplictionInfo/Application'));

// ─── Help Center ──────────────────────────────────────────
const PrivacyPolicy = lazy(() => import('../pages/HelpCenter/PrivacyPolicy'));
const FAQs = lazy(() => import('../pages/HelpCenter/FAQs'));
const Policies = lazy(() => import('../pages/HelpCenter/Policies'));
const Support = lazy(() => import('../pages/HelpCenter/Support'));
const Documentation = lazy(() => import('../pages/HelpCenter/Documentation'));

// ─── Router ───────────────────────────────────────────────
const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      errorElement:<Error/>,
      children: [
        // Home
        { index: true, element: <Home /> },

        // University
        { path: "university/about", element: <AboutUniversity /> },
        { path: "university/vision", element: <Vision /> },

        // Services
        { path: "services/services", element: <ServicesWebsite /> },
        { path: "services/library", element: <LibraryWebsite /> },

        // News
        { path: "news/advertisements", element: <AdvertisementsWebsite /> },
        { path: "news/articles", element: <Articles /> },
        { path: "news/articles/:id", element: <ArticlesDetails /> },
        { path: "news/events", element: <EventsWebsite /> },
        { path: "news/events/:id", element: <EventDeatils /> },

        // Academics
        { path: "academics/colleges", element: <Colleges /> },
        {path:"academics/colleges/:id", element:<CollegeDetails/>},
      
        { path: "academics/departments", element: <DepartmentWebsite /> },
        { path: "academics/programs", element: <ProgramWebsite /> },
        { path: "academics/staff", element: <StaffWebsite /> },

        // Careers & Admission
        { path: "careers/job-posting", element: <JobPostingWebsite /> },
        { path: "admission/students", element: <StudentWebsite /> },
        { path: "student-guide", element: <StudentGuide /> },
        { path: "student-services", element: <StudentServices /> },
        { path: "exam-instructions", element: <ExamInstructions /> },
        { path: "application", element: <Application /> },

        // Help Center
        { path: "privacy", element: <PrivacyPolicy /> },
        { path: "faqs", element: <FAQs /> },
        { path: "policy", element: <Policies /> },
        { path: "support", element: <Support /> },
        { path: "documentation", element: <Documentation /> },
      ],
      
    },
      {
        path: '*',
        element: <Error />,
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;