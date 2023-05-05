import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useState, useEffect } from "react";

const Textbox = ({ initialContent, setText, setContent }) => {
  const [quill, setQuill] = useState();

  const outerRef = useCallback((wrapper) => {
    if (wrapper == null) {
      return;
    }
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: [
          [
            "bold",
            "underline",
            "italic",
            { list: "ordered" },
            { list: "bullet" },
            "link"
          ],
        ],
      },
      placeholder: "Add text here...",
    });
    setQuill(q);
    q.setContents(initialContent);
  }, []);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (e) => {
        setText(quill.getText());
        setContent(quill.getContents());
      });
    }
  }, [quill, setText, setContent]);

  return (
    <div
      id="container"
      ref={outerRef}
      className="mt-1 mb-2 h-60 rounded-xl xl:h-80"
    ></div>
  );
};

export default Textbox;
