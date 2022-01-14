import styled from "styled-components";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { DragDrop } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { useState } from "react";

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

export default function PhotoPicker({ catchCard }) {
  const [photoUploadDone, setPhotoUploadDone] = useState(false);

  function photoUploadSwitch() {
    setPhotoUploadDone(!photoUploadDone);
  }

  catchUppy.on("upload-success", async (_file, response) => {
    let path = await response.body.photoPath;
    catchCard.img = path.substring(0, path.length - 1);
    photoUploadSwitch();
  });

  console.log(catchCard.img);

  return (
    <div>
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
            <Img src={catchCard.img} alt="Ihr Fangbild" />
          </div>
        </PhotoPreview>
      )}
    </div>
  );
}

//styled components from here

const PhotoPreview = styled.div`
  border: 1px solid var(--color-two);
  display: flex;
  flex-basis: 100%;
`;

const Img = styled.img`
  width: 200px;
  height: auto;
`;
