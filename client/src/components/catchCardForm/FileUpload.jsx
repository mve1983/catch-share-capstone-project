import styled from "styled-components";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { DragDrop } from "@uppy/react";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import "@uppy/core/dist/style.css";
import "../../lib/uppy-dragdrop-styles.css";
import { useState } from "react";
import confirm from "../../img/green-confirm.png";

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
    endpoint: "/image",
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
      <div>
        Photo teilen: <br />
        <small>(1 Photo, max 3MB, Formate: jpg(jpeg), png, gif)</small>
      </div>
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
          <ConfirmSignPhoto src={confirm} alt="confirm sign" />
        </PhotoPreview>
      )}
    </UploadSection>
  );
}

const PhotoPreview = styled.div`
  border: 1px solid var(--color-two);
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  flex-basis: 100%;
`;

const ConfirmSignPhoto = styled.img`
  width: 2rem;
  height: auto;
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
`;
