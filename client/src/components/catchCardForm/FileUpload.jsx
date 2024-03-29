import styled from "styled-components";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { DragDrop } from "@uppy/react";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import "@uppy/core/dist/style.css";
import "../../lib/css/uppy-dragdrop-styles.css";
import { useState } from "react";

export default function PhotoPicker({
  onInputChange,
  photoUploadDone,
  onPhotoUpload,
}) {
  const catchUppy = new Uppy({
    id: "catchUppy",
    meta: { type: "catchPhoto" },
    restrictions: {
      maxNumberOfFiles: 1,
      maxFileSize: 3145728,
      allowedFileTypes: ["image/*", ".jpg", ".jpeg", ".png", ".gif"],
    },
    autoProceed: true,
  });

  const [photoPreviewPath, setPhotoPreviewPath] = useState("");

  catchUppy.use(XHRUpload, {
    endpoint: "/api/image",
    fieldName: "catchPhoto",
    formData: true,
  });

  catchUppy.use(ThumbnailGenerator, {
    thumbnailWidth: 200,
    waitForThumbnailsBeforeUpload: false,
  });

  catchUppy.on("upload-success", async (_file, response) => {
    let path = await response.body.photoPath;
    onPhotoUpload();
    onInputChange("img", path);
  });

  catchUppy.on("thumbnail:generated", (file, preview) => {
    let photoPreview = preview;
    setPhotoPreviewPath(photoPreview);
  });

  return (
    <UploadSection>
      <UploadText>
        Photo teilen: <br />
        <small>(1 Photo, max 3MB, Formate: jpg(jpeg), png, gif)</small>
      </UploadText>
      {!photoUploadDone && (
        <DragDrop
          uppy={catchUppy}
          width={200}
          heigt={120}
          locale={{
            strings: {
              dropHereOr: "Drag&Drop oder %{browse}",
              browse: "Suchen. ",
            },
          }}
        />
      )}
      {photoUploadDone && (
        <PhotoPreview>
          <img src={photoPreviewPath} alt="Preview Catch Photo" />
        </PhotoPreview>
      )}
    </UploadSection>
  );
}

const PhotoPreview = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  min-height: 6rem;
  flex-basis: 100%;

  img {
    max-width: 6rem;
    max-height: 6rem;
  }
`;

const UploadSection = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const UploadText = styled.div`
  margin-bottom: 0.2rem;
`;
