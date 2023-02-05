import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { applySignedUrl } from '@/services/cos';
import { request } from '@umijs/max';

const CDN = 'static.xhpolaris.com';

const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const UploadImagesFormItem = ({ value = [], onChange, limit = 1 }: any) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [url, setUrl] = useState<string>('');
  const [sessionToken, setSessionToken] = useState<string>('');
  const [contentType, setContentType] = useState<string>('');

  useEffect(() => {
    if (value.length) {
      const newFileList: any = [];
      value.map((item: string) => {
        newFileList.push({
          uid: item,
          url: item,
        });
      });
      setFileList([...newFileList]);
    }
  }, [value]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const urlList: any = [];
    newFileList.map((item: any) => {
      if (item?.uid !== item?.url) {
        if (item?.status === 'done' || item?.status === 'uploading') {
          // 去除url内的param
          let newUrl = url.substring(0, url.lastIndexOf('?'));
          // 将url的host替换为CDN域名
          newUrl = newUrl.replace(/(https:\/\/|http:\/\/)(.*?)(\/.*)/, `$1${CDN}$3`);
          urlList.push(newUrl);
        }
      } else {
        urlList.push(item?.url);
      }
    });
    onChange?.(urlList);
  };

  const beforeUpload = async (file: any): Promise<any> => {
    const { name, type } = file;
    const suffix = name.substring(name.lastIndexOf('.'));
    const resp = await applySignedUrl({
      suffix: suffix,
    });
    if (resp.url) {
      setUrl(resp.url);
    }
    if (resp.sessionToken) {
      setSessionToken(resp.sessionToken);
    }
    if (type) {
      setContentType(type);
    }
  };

  const handleRequest = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const arrayBuffer: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
    const config = {
      headers: {
        'x-cos-security-token': sessionToken,
        'Content-Type': contentType,
      },
    };
    try {
      const res = await request(url, {
        method: 'PUT',
        data: arrayBuffer,
        ...config,
      });
      onSuccess(res);
    } catch (e) {
      onError({ e });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  return (
    <>
      <Upload
        action={url}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        method="PUT"
        customRequest={handleRequest}
      >
        {fileList.length >= limit ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImagesFormItem;
