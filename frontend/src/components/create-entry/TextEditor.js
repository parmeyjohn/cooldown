import CharacterCount from "@tiptap/extension-character-count";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item"; // get rid of this and bullet list from package json
import Link from "@tiptap/extension-link";

import { ReactComponent as BoldIcon } from "../../assets/heroicons/bold.svg";
import { ReactComponent as ItalicIcon } from "../../assets/heroicons/italic.svg";
import { ReactComponent as StrikeIcon } from "../../assets/heroicons/strike.svg";
import { ReactComponent as BulletListIcon } from "../../assets/heroicons/bullet-list.svg";
import { ReactComponent as OrderedListIcon } from "../../assets/heroicons/ordered-list.svg";

const charLimit = 1000;
const extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-inside",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-inside",
      },
    },
  }),
  CharacterCount.configure({
    charLimit,
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
    linkOnPaste: true,
    HTMLAttributes: {
      class: "text-blue-500 underline cursor-pointer",
    },
  }),
];
const content = "<p>Hello World!</p>";

const TextEditor = ({
  initialContent,
  setText,
  setTextCharacterCount,
  setTextAsJSON,
}) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "overflow-y-auto list-disc mb-2 h-60 rounded-b-lg xl:h-80 bg-slate-300 p-4 shadow-inner shadow-slate-400 outline-8 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      setText(editor.getText());
      setTextAsJSON(editor.getJSON());
      setTextCharacterCount(editor.storage.characterCount.characters());
    },
  });

  const percentage = editor
    ? Math.round((100 / charLimit) * editor.storage.characterCount.characters())
    : 0;

  return (
    <>
      {editor && (
        <div className="flex w-full justify-between divide-x divide-slate-400 rounded-t-lg border-b-2 border-solid border-slate-400 bg-slate-200 ">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`flex h-16 w-full items-center justify-center rounded-tl-lg p-3  transition-all duration-75 ease-linear hover:bg-emerald-200 active:bg-emerald-300 ${
              editor.isActive("bold")
                ? "border-b-4 border-teal-600 bg-green-300"
                : ""
            }`}
          >
            <BoldIcon></BoldIcon>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`flex h-16 w-full items-center justify-center p-3 transition-all duration-75 ease-linear hover:bg-emerald-200 active:bg-emerald-300 ${
              editor.isActive("italic")
                ? "border-b-4 border-teal-600 bg-green-300"
                : ""
            }`}
          >
            <ItalicIcon></ItalicIcon>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`flex h-16 w-full items-center justify-center p-3 transition-all duration-75 ease-linear hover:bg-emerald-200 active:bg-emerald-300 ${
              editor.isActive("strike")
                ? "border-b-4 border-teal-600 bg-green-300"
                : ""
            }`}
          >
            <StrikeIcon></StrikeIcon>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`flex h-16 w-full items-center justify-center p-3 transition-all duration-75 ease-linear hover:bg-emerald-200 active:bg-emerald-300 ${
              editor.isActive("bulletList")
                ? "border-b-4 border-teal-600 bg-green-300"
                : ""
            }`}
          >
            <BulletListIcon></BulletListIcon>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`flex h-16 w-full items-center justify-center rounded-tr-lg transition-all duration-75 ease-linear hover:bg-emerald-200 active:bg-emerald-300 ${
              editor.isActive("orderedList")
                ? "border-b-4 border-teal-600 bg-green-300"
                : ""
            }`}
          >
            <OrderedListIcon></OrderedListIcon>
          </button>
        </div>
      )}
      <EditorContent editor={editor} />

      {editor && (
        <div className="flex justify-between px-2 pb-4">
          <span className="flex gap-2 ">
            <svg height="20" width="20" viewBox="0 0 20 20">
              <circle r="10" cx="10" cy="10" className="fill-slate-300" />
              <circle
                r="5"
                className={`${
                  editor.storage.characterCount.characters() >= charLimit
                    ? "stroke-red-800"
                    : "stroke-teal-600"
                }`}
                cx="10"
                cy="10"
                fill="transparent"
                strokeWidth="10"
                strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                transform="rotate(-90) translate(-20)"
              />
              <circle className="fill-teal-50" r="6" cx="10" cy="10" />
            </svg>
            {editor.storage.characterCount.characters()} / {charLimit}{" "}
            characters
          </span>
          {editor.storage.characterCount.words()} words
        </div>
      )}
    </>
  );
};

export default TextEditor;
