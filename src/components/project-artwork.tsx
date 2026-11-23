import type { Project } from "@/lib/projects";
import { assetPath } from "@/lib/asset-path";

export function ProjectArtwork({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.image) {
    return (
      // Keep original artwork intact; contain rather than crop UI screenshots.
      // eslint-disable-next-line @next/next/no-img-element
      <img className="project-artwork" src={assetPath(project.image)} alt={project.imageAlt} loading={large ? "eager" : "lazy"} />
    );
  }

  return (
    <div className={`type-cover type-cover--${project.theme}`}>
      <span className="cover-kicker">{project.medium}</span>
      <div className="cover-title" lang={project.id === "keystone" ? "en" : "zh-CN"}>
        {project.id === "keystone" ? <>Key<span>stone.</span></> : project.title}
      </div>
      <span className="cover-english">{project.englishTitle}</span>
      <span className="cover-pending">原始作品图片待补充</span>
    </div>
  );
}
