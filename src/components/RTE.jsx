import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 pl-1 text-text font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey="djnn40asfbj2elbwo11oubzf13svca3mhxxormyummvna3rj"
            init={{
              height: 500,
              min_height: 300, // Ensures better responsiveness
              width: "100%", // Make the editor responsive
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks", "code",
                "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
              ],
              toolbar_mode: "wrap", // Adapts toolbar for small screens
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; resize: vertical; }",
              setup: (editor) => {
                editor.on("change", () => {
                  editor.save();
                });
                editor.on("blur", () => {
                  editor.save();
                });
              },
              // Responsive toolbar and menu for smaller screens
              mobile: {
                toolbar: "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist",
              },
            }}
            onEditorChange={onChange}
            className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none w-full"
          />
        )}
      />
    </div>
  );
}
