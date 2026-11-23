import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/lib/projects";
import { projectDetails } from "@/lib/project-details";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const title = slug === "liaoning" ? "山海辽藏 · 辽宁物产" : project.title;
  return { title: `${title} — 产品设计作品集`, description: projectDetails[slug]?.scopeNote || project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0 || !projectDetails[slug]) notFound();
  return <ProjectDetail project={projects[index]} detail={projectDetails[slug]} previous={projects[(index - 1 + projects.length) % projects.length]} next={projects[(index + 1) % projects.length]} />;
}
