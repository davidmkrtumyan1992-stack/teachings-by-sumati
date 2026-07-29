import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import { SiteLayout } from "@/components/layout/SiteLayout";

// Pages
import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import ClassPage from "@/pages/ClassPage";
import PracticeModulesPage from "@/pages/PracticeModulesPage";
import PracticeModuleDetailPage from "@/pages/PracticeModuleDetailPage";
import PracticeModuleClassPage from "@/pages/PracticeModuleClassPage";
import RetreatsPage from "@/pages/RetreatsPage";
import EventsPage from "@/pages/EventsPage";
import ProjectsPage from "@/pages/ProjectsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/aci-courses" component={CoursesPage} />
      <Route path="/aci-courses/:courseId" component={CourseDetailPage} />
      <Route path="/aci-courses/:courseId/:classId" component={ClassPage} />
      <Route path="/practice-modules" component={PracticeModulesPage} />
      <Route path="/practice-modules/:moduleId" component={PracticeModuleDetailPage} />
      <Route path="/practice-modules/:moduleId/:classId" component={PracticeModuleClassPage} />
      <Route path="/retreats" component={RetreatsPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <SiteLayout>
        <Router />
      </SiteLayout>
    </WouterRouter>
  );
}

export default App;
