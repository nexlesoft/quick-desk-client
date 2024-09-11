import { BaseType } from "./common";

export interface Media extends BaseType {
  context: string;
  file_size: number;
  is_draft: boolean;
  is_public: boolean;
  md5_hash?: string;
  mime: string;
  name: string;
  url: string;
}
