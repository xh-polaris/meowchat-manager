import { useState } from 'react';
import styles from './index.less';
interface Props {
  text: string;
  limit: number;
}

const Unfold = ({ text, limit }: Props) => {
  const [show, setShow] = useState(false);
  return text?.length > limit ? (
    <div>
      {!show ? (
        <>
          {text.substring(0, limit - 1)}...
          <span onClick={() => setShow(!show)} className={styles.unfoldbtn}>
            展开
          </span>
        </>
      ) : (
        <>
          {text}
          <span onClick={() => setShow(!show)} className={styles.unfoldbtn}>
            收回
          </span>
        </>
      )}
    </div>
  ) : (
    <>{text}</>
  );
};

export default Unfold;
