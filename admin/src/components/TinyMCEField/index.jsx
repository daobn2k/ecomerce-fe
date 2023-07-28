import { Editor } from '@tinymce/tinymce-react';
import FormControlLabel from 'components/FormControlLabel';

const TinyMCEFieldCustom = (props) => {
    const {
        defaultValue,
        placeholder,
        disabled,
        value,
        name,
        fullWidth,
        type,
        maxLength,
        handleOnChange,
        control,
        onFocus,
        initMCE = {},
    } = props;
    return (
        <FormControlLabel {...props}>
            <Editor
                value={value}
                initialValue={defaultValue || ''}
                type={type}
                fullWidth={fullWidth}
                className={''}
                textareaName={name}
                disabled={disabled}
                placeholder={placeholder}
                control={control}
                style={{ resize: 'both' }}
                init={{
                    placeholder: placeholder,
                    min_height: 450,
                    menubar: false,
                    branding: false,
                    max_chars: maxLength,
                    plugins: [
                        'code',
                        'advlist autolink lists link charmap preview anchor',
                        'searchreplace visualblocks fullscreen',
                        'insertdatetime media table help wordcount image',
                    ],
                    toolbar:
                        'code | ' +
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    selector: 'textarea',
                    setup: function (editor) {
                        editor.on('focus', function (e) {
                            onFocus && onFocus();
                        });
                    },
                    paste_data_images: true,
                    images_upload_credentials: true,
                    ...initMCE,
                }}
                onEditorChange={handleOnChange}
            />
        </FormControlLabel>
    );
};

export default TinyMCEFieldCustom;
