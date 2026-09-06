import { useRef } from "react";

function FileUploader({ accept, multiple = false, onFiles, label = "Choose file(s)" }) {
  const inputRef = useRef(null);

  function handleChange(event) {
    const files = Array.from(event.target.files ?? []);
    onFiles?.(files);
    event.target.value = "";
  }

  return <div className="file-uploader">
    <input ref={inputRef} type="file" accept={accept} multiple={multiple}
      onChange={handleChange} className="file-uploader__input" />
    <button type="button" className="button button--outline" onClick={() => inputRef.current?.click()}>
      {label}
    </button>
  </div>;
}
export default FileUploader;
