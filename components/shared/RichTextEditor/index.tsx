import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({
  initialContent,
  onChange,
  error,
  height = 400,
}: {
  initialContent: string;
  onChange: (content: string) => void;
  error?: string;
  height?: number;
}) {
  return (
    <div className="w-full">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        value={initialContent}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'anchor',
            'autolink',
            'charmap',
            'codesample',
            'emoticons',
            'image',
            'link',
            'lists',
            'media',
            'searchreplace',
            'table',
            'visualblocks',
            'wordcount',
          ],
          toolbar:
            'blocks fontfamily fontsize|forecolor backcolor | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | fullscreen preview',
          content_style:
            'body { font-family:Poppins,sans-serif; font-size:14px; line-height:1.4; }',
        }}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
