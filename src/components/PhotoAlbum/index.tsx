import { Image } from 'antd';
import { useState } from 'react';

const PhotoAlbum = (props: any) => {
  const [visible, setVisible] = useState(false);

  const { photos = [] } = props;

  return (
    <>
      <Image
        preview={{ visible: false }}
        width={80}
        src={photos[0] || ''}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          {photos.map((photo: string) => (
            <Image src={photo} key={photo} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default PhotoAlbum;
