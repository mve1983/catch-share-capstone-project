import styled from "styled-components";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { DragDrop } from "@uppy/react";
import ThumbnailGenerator from '@uppy/thumbnail-generator'
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { useState } from "react";
import confirm from "../../img/green-confirm.png";

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

catchUppy.use(XHRUpload, {
  endpoint: "/image",
  fieldName: "catchPhoto",
  formData: true,
});

catchUppy.use(ThumbnailGenerator, {
  thumbnailWidth: 200,
  waitForThumbnailsBeforeUpload: false,
})

export default function PhotoPicker({ catchCard }) {
  const [photoUploadDone, setPhotoUploadDone] = useState(false);
  const [photoPreviewPath, setPhotoPreviewPath] = useState("")

  function photoUploadSwitch() {
    setPhotoUploadDone(!photoUploadDone);
  }

  catchUppy.on("upload-success", async (_file, response) => {
    let path = await response.body.photoPath;
    catchCard.img = path.substring(0, path.length - 1);
    photoUploadSwitch();
  });



  catchUppy.on('thumbnail:generated', (file, preview) => {
    let photoPreview = preview
    setPhotoPreviewPath(photoPreview)
  })


  return (
    <section>
      <div>Photo teilen: <br />
  <small>(1 Photo, max 3MB, Formate: jpg, png, gif)</small></div>
      {!photoUploadDone && (
        <DragDrop
          uppy={catchUppy}
          locale={{
            strings: {
              dropHereOr: "Datei hier hineinziehen oder %{browse}",
              browse: "Datei suchen. ",
            },
          }}
        />
      )}
      {photoUploadDone && (
        <PhotoPreview>
          <div>
            <img src={photoPreviewPath} alt="Preview Catch Photo" /> 
          <span><ConfirmSignPhoto src={confirm} alt="confirm sign" /></span>
          </div>
        </PhotoPreview>
      )}
    </section>
  );
}

//styled components from here

const PhotoPreview = styled.div`
  border: 1px solid var(--color-two);
  display: flex;
  flex-basis: 100%;
`;

const ConfirmSignPhoto = styled.img`
  width: 2rem;
  height: auto;
`;
