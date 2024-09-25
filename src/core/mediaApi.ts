import JsZip from "jszip";
import FileSaver from "file-saver";

import { HttpClient } from "./axios";
import { BaseResponse } from "./types/common";
import { Media } from "./types/media";
import { formatDate } from "../utils/date-time";

const basePath = "/media";
const downloadPath = "/media-download";

export class MediaApi extends HttpClient {
  constructor() {
    super();
  }

  private async downloadFile(url: string) {
    const fetchUrl = await fetch(url);
    const result = {
      name: url.substring(url.indexOf("_") + 1, url.lastIndexOf(".")),
      type: url.substring(url.lastIndexOf(".") + 1),
      blob: fetchUrl.blob(),
    };
    return result;
  }

  private downloadByGroup(urls: string[]) {
    return Promise.all(urls.map((url) => this.downloadFile(url)));
  }

  private exportZip(
    blobs: {
      name: string;
      type: string;
      blob: Promise<Blob>;
    }[]
  ) {
    return new Promise((resolve) => {
      const zip = JsZip();
      for (const blob of blobs) {
        zip.file(`${blob.name}.${blob.type}`, blob.blob);
      }

      resolve(
        zip.generateAsync({ type: "blob" }).then((zipFile) => {
          const fileName = `${formatDate(new Date())}.zip`;
          return FileSaver.saveAs(zipFile, fileName);
        })
      );
    });
  }

  private downloadAndZip(urls: string[]) {
    return this.downloadByGroup(urls).then(this.exportZip);
  }

  // Method to fetch a single media by its ID
  async getById(mediaId: string): Promise<BaseResponse<Media>> {
    return this.get<BaseResponse<Media>>({
      url: `${basePath}/${mediaId}`,
    });
  }

  // User for FE only
  async download({
    mediaIds,
    fileName,
    fileUrl,
    downloadSpecify,
    mediaUrls,
  }: {
    mediaIds?: string[];
    fileName: string;
    fileUrl: string;
    downloadSpecify?: boolean;
    mediaUrls?: string[];
  }): Promise<void> {
    const validExtensions = [
      "png",
      "pdf",
      "json",
      "vnd.rar",
      "ppt",
      "pptx",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "mp4",
      "rar",
    ];

    // Extract the file extension and normalize to lowercase
    const fileExtension = fileName
      ?.slice(fileName.lastIndexOf(".") + 1)
      .toLowerCase();

    if (!downloadSpecify && validExtensions.includes(fileExtension)) {
      window.open(fileUrl, "_blank");
    } else {
      // If mediaUrls is provided, zip and download those files
      if (mediaUrls) {
        await this.downloadAndZip(mediaUrls);
      } else {
        // Otherwise, fetch and download the specified media by ID
        const response = (await this.get({
          url: `${downloadPath}/${mediaIds?.join("_")}`,
          config: {
            responseType: "blob",
          },
        })) as Blob;

        if (response) {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement("a");

          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();

          // Remove the DOM element after the download
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      }
    }
  }

  // Method to create a new media
  async upload({
    files,
    isPublic = false,
    context,
    activityLogContext,
  }: {
    files: File[];
    isPublic?: boolean;
    context?: string;
    activityLogContext?: string;
  }): Promise<PromiseSettledResult<BaseResponse<Media>>[]> {
    return await Promise.allSettled(
      Object.values(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        let validUrl = `${basePath}?is_public=${isPublic}`;

        if (context) {
          validUrl += `&context=${context}`;
        }

        if (activityLogContext) {
          validUrl += `&activity_context=${activityLogContext}`;
        }

        return await this.post<BaseResponse<Media>>({
          url: validUrl,
          data: formData,
          config: {
            headers: {
              "content-type": "multipart/form-data",
            },
          },
        });
      })
    );
  }

  async updateMedia({
    id,
    ...mediaData
  }: Partial<Media>): Promise<BaseResponse<Media>> {
    return this.put<BaseResponse<Media>>({
      url: `${basePath}/${id}`,
      data: mediaData,
    });
  }

  async deleteTicket(mediaId: Partial<Media>): Promise<BaseResponse<Media>> {
    return this.delete<BaseResponse<Media>>({
      url: `${basePath}/${mediaId}`,
    });
  }
}
