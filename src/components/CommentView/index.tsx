import { CREATE_AT, TEXT, USER } from '@/pages/commonSettings';
import { fetchCurrentComments } from '@/services/comment';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

const columns = [
  {
    order: 10,
    ...USER,
    width: 200,
  },
  {
    order: 8,
    ...CREATE_AT,
    title: '发布时间',
    width: 200,
  },
  {
    order: 6,
    ...TEXT,
  },
];

const CommentView = ({ open, setCommentVisible, currentId, scope = 'moment' }: any) => {
  const [data, setData] = useState<any>({});

  const handleOk = () => {
    setCommentVisible(false);
  };

  const handleCancel = () => {
    setCommentVisible(false);
  };

  useEffect(() => {
    if (open) {
      fetchCurrentComments({
        id: currentId,
        scope: scope,
        page: 0,
      }).then((res) => setData(res));
    }
  }, [open]);

  const { comments = [] } = data;

  const footer = [
    <Button key="ok" type="primary" onClick={handleOk}>
      好的
    </Button>,
  ];

  return (
    <>
      <Modal title="查看评论" open={open} onCancel={handleCancel} footer={footer} width={800}>
        <ProTable
          columns={columns}
          dataSource={comments}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            pageSize: 5,
          }}
          search={false}
          dateFormatter="string"
          options={false}
        />
      </Modal>
    </>
  );
};

export default CommentView;
