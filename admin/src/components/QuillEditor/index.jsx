import FormControlLabel from 'components/FormControlLabel';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import ImageResize from 'quill-image-resize-module-react';
import { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
Quill.register('modules/imageResize', ImageResize);
window.Quill = Quill;

const QuillEditor = (props) => {
  const { handleOnChange, placeholder = '', defaultValue } = props;

  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html) => {
    setEditorHtml(html);
    handleOnChange && handleOnChange(html);
  };

  useEffect(() => {
    if (defaultValue) {
      setEditorHtml(defaultValue);
    }
  }, [defaultValue]);

  return (
    <FormControlLabel {...props}>
      <ReactQuill
        theme='snow'
        onChange={handleChange}
        value={editorHtml}
        modules={QuillEditor.modules}
        formats={QuillEditor.formats}
        bounds='#root'
        placeholder={placeholder}
      />
    </FormControlLabel>
  );
};

QuillEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['image'],
    ['clean'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    ['link']
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
  imageDropAndPaste: true,
};

QuillEditor.formats = [
  'header',
  'size',
  'font',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'image',
  'align',
  'float',
  'alt',
  'height',
  'width',
  'style',
  'link'
];

export default QuillEditor;
