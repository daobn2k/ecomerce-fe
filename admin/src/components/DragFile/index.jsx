import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Upload } from 'antd';
import FormControlLabel from 'components/FormControlLabel';
import { useRef } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import styles from './index.module.scss';

const { Dragger } = Upload;
const DragFile = (props, ref) => {
  const { name, multiple, onChange, onDrop, ...rest } = props;
  const DragFileRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      hiddenUpload,
    }),
    []
  );

  const hiddenUpload = (display) => {
    const domUpload = document.getElementsByClassName('ant-upload')[0];
    if (domUpload) {
      domUpload.style.display = display;
    }
  };

  return (
    <FormControlLabel {...props}>
      <Dragger
        name={name}
        multiple={multiple}
        onChange={onChange}
        onDrop={onDrop}
        {...rest}
        className={styles.drag}
        ref={DragFileRef}
      >
        <p className='ant-upload-drag-icon'>
          <FontAwesomeIcon icon={faCloudUpload} />
        </p>
        <p className='ant-upload-text'>Kéo thả file vào đây</p>
        <p className='ant-upload-text'>hoặc</p>
        <Button className={styles.button}>Chọn file</Button>
      </Dragger>
    </FormControlLabel>
  );
};
export default forwardRef(DragFile);
