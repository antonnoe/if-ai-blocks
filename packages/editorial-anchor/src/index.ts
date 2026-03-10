export interface EditorialAnchor {
  editorial_anchor_text: string;
  editorial_anchor_hash: string;
  publication_date: string;
  page_url: string;
  section_anchor?: string;
}

export interface ContainerContext {
  container_type:
    | "article"
    | "dossier"
    | "tool"
    | "calculator"
    | "builder"
    | "module";
  container_title: string;
  container_url: string;
  container_function: string;
  section_or_anchor: string;
  topic_tags: string[];
}
