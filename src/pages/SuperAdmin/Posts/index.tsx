import { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { POSTS_COLUMNS } from '@/pages/SuperAdmin/Posts/settings';
import { OPERATIONS } from '@/pages/commonSettings';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import View from '@/pages/SuperAdmin/Posts/components/View';
import Create from '@/pages/SuperAdmin/Posts/components/Create';
import Delete from '@/pages/SuperAdmin/Posts/components/Delete';
import Edit from '@/pages/SuperAdmin/Posts/components/Edit';
import ToggleOfficial from '@/pages/SuperAdmin/Posts/components/ToggleOfficial';
import { getPostPreviews } from '@/services/posts';
import CommentView from '@/components/CommentView';

const Post = () => {
  const actionRef = useRef<ActionType>();
  const [currentPost, setCurrentPost] = useState('');
  const [viewVisible, setViewVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [toggleOfficialVisible, setToggleOfficialVisible] = useState(false);
  const [data, setData] = useState({});
  const [commentVisible, setCommentVisible] = useState(false);

  const requestTable = async (
    params: any & {
      pageSize: number;
      current: number;
    },
  ) => {
    const msg = await getPostPreviews({
      ...params,
      current: params.current,
      pageSize: params.pageSize,
      offset: (params.current - 1) * params.pageSize,
    });
    return {
      data: msg.posts,
      success: true,
      total: msg.total,
    };
  };

  const columns: ProColumns[] = [
    ...POSTS_COLUMNS,
    {
      ...OPERATIONS,
      width: 300,
      render: (_, record) => (
        <>
          <Button
            type="link"
            size="small"
            key="edit"
            onClick={() => {
              setCurrentPost(record.id);
              setEditVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            key="toggleOfficial"
            onClick={() => {
              setCurrentPost(record.id);
              setData({
                isOfficial: record.isOfficial,
              });
              setToggleOfficialVisible(true);
            }}
          >
            {record.isOfficial ? '取消官方' : '设为官方'}
          </Button>
          <Button
            type="link"
            size="small"
            key="view"
            onClick={() => {
              setCurrentPost(record.id);
              setViewVisible(true);
            }}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            danger
            key="delete"
            onClick={() => {
              setCurrentPost(record.id);
              setDeleteVisible(true);
            }}
          >
            删除
          </Button>
          <Button
            type="link"
            size="small"
            key="comment_view"
            onClick={() => {
              setCurrentPost(record.id);
              setCommentVisible(true);
            }}
          >
            查看评论
          </Button>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="帖子信息"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
        ]}
        request={requestTable}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
      />
      <View open={viewVisible} setViewVisible={setViewVisible} currentPost={currentPost} />
      <Create open={createVisible} setCreateVisible={setCreateVisible} actionRef={actionRef} />
      <Delete
        open={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        actionRef={actionRef}
        currentPost={currentPost}
      />
      <Edit
        open={editVisible}
        setEditVisible={setEditVisible}
        actionRef={actionRef}
        currentPost={currentPost}
      />
      <ToggleOfficial
        open={toggleOfficialVisible}
        setToggleOfficialVisible={setToggleOfficialVisible}
        actionRef={actionRef}
        currentPost={currentPost}
        data={data}
      />
      <CommentView
        open={commentVisible}
        setCommentVisible={setCommentVisible}
        currentId={currentPost}
        scope="post"
      />
    </PageContainer>
  );
};

export default Post;
