import { capabilities, projects as sourceProjects, experienceTimeline } from '../../../blog/docs/.vitepress/theme/data/portfolio';
export { capabilities, experienceTimeline };
export type { Capability, PortfolioProject } from '../../../blog/docs/.vitepress/theme/data/portfolio';

// Reuse the existing public facts; only route ownership changes in the new main site.
export const projects = sourceProjects.map((project) => {
  const field = capabilities.find((item) => item.projectIds.includes(project.id));
  if (!field) throw new Error(`No field configured for project: ${project.id}`);
  return { ...project, fieldId: field.id, fieldTitle: field.title, detail: `/projects/${field.id}/${project.id}/` };
});
export type SiteProject = (typeof projects)[number];
export const projectMap = Object.fromEntries(projects.map((project) => [project.id, project])) as Record<string, SiteProject>;
