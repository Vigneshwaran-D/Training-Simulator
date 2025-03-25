import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import Profile from "@/pages/Profile";
import TrainingDetail from "@/pages/TrainingDetail";
import Achievements from "@/pages/Achievements";
import Simulation from "@/pages/Simulation";
import Library from "@/pages/Library";
import Reports from "@/pages/Reports";
import Calendar from "@/pages/Calendar";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard}/>
      <Route path="/courses" component={Courses} />
      <Route path="/profile" component={Profile} />
      <Route path="/training/:id" component={TrainingDetail} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/simulation" component={Simulation} />
      <Route path="/library" component={Library} />
      <Route path="/reports" component={Reports} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
