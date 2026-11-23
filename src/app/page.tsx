import { Portfolio } from "@/components/portfolio";
import { projects } from "@/lib/projects";

export default function Home() {
  return <Portfolio projects={projects} />;
}
