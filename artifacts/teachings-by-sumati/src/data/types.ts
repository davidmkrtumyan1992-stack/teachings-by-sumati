export interface ClassEntry {
  class_number: number | string;
  video_en?: string | null;
  video_ru?: string | null;
  transcript_en?: string | null;
  transcript_ru?: string | null;
  materials?: string[] | null;
  status?: 'ready' | 'not_recorded_yet' | null;
}

export interface Course {
  id: string;
  number: number;
  title_en: string;
  title_ru?: string | null;
  date?: string | null;
  total_classes?: number;
  has_review?: boolean;
  platform_en?: string | null;
  platform_ru?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  classes?: ClassEntry[];
}

export interface Project {
  id: string;
  title_en: string;
  title_ru?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  url?: string | null;
  image?: string | null;
}

export interface Biography {
  en?: string | null;
  ru?: string | null;
}

export interface CoursesData {
  courses: Course[];
  biography?: Biography;
  projects?: Project[];
}
