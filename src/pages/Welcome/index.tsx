import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Space } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  const access = localStorage.getItem('access') || '';

  const redirectProd = () => {
    localStorage.removeItem('environment');
  };

  const redirectTest = () => {
    localStorage.setItem('environment', 'test');
  };

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            'radial-gradient(circle at 97% 10%, #EBF2FF 0%, #F5F8FF 28%, #EBF1FF 124%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#1A1A1A',
            }}
          >
            欢迎使用 Meowchat 管理面板
          </div>
        </div>
      </Card>
      {access === 'superAdmin' && (
        <>
          <Card>
            <Space>
              <Button onClick={redirectProd} type="primary">
                生产环境
              </Button>
              <Button onClick={redirectTest} type="primary">
                测试环境
              </Button>
            </Space>
          </Card>
        </>
      )}
    </PageContainer>
  );
};

export default Welcome;
