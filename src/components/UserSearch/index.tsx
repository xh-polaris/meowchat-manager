import { searchUserInfo } from '@/services/user';
import { Input, message } from 'antd';
import { useState } from 'react';

const { Search } = Input;

const UserSearch = (props: any) => {
  const [loading, setLoading] = useState(false);

  const { setUsers } = props;

  const handleSearch = async (value: string) => {
    setLoading(true);
    const data = await searchUserInfo({ keyword: value, page: 0 });
    setLoading(false);
    setUsers(data?.users);
    if (data.users.length === 0) {
      return message.info('查无此人');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 100,
          }}
        >
          搜索用户：
        </span>
        <Search
          placeholder="请输入用户名"
          enterButton="搜索"
          onSearch={handleSearch}
          loading={loading}
        />
      </div>
    </>
  );
};

export default UserSearch;
