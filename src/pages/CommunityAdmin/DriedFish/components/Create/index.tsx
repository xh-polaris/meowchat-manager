import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { fetchCatList } from '@/services/cat';
import { createPlan } from '@/services/dried-fish';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { DatePicker, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const { RangePicker } = DatePicker;

const Create = ({ open, setCreateVisible, actionRef }: any) => {
  const [catInfo, setCatInfo] = useState([]);
  const access = localStorage.getItem('access');
  const handleCreate = async (value: any) => {
    let startTime, endTime;
    if (value.planTime) {
      startTime = moment(value?.planTime?.[0])?.startOf('day')?.valueOf() / 1000;
      endTime = moment(value?.planTime?.[1])?.startOf('day')?.valueOf() / 1000;
      delete value.planTime;
    }
    const data = {
      ...value,
      id: '',
      communityId: localStorage.getItem('communityId'),
      coverUrl: value?.coverUrl?.[0],
      startTime,
      endTime,
    };
    const success = await createPlan(data);
    if (success) {
      setCreateVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  const handleSearch = async (value: any) => {
    const msg = await fetchCatList({
      // @ts-ignore
      communityId: localStorage.getItem('communityId'),
      page: 0,
      keyword: value,
    });
    setCatInfo(msg.cats);
  };

  return (
    <DrawerForm
      title="新增小鱼干计划"
      width="600px"
      open={open}
      onOpenChange={setCreateVisible}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      onFinish={handleCreate}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
        name="name"
        label="计划名"
      />
      <Form.Item
        name="catId"
        rules={[
          {
            required: access !== 'superAdmin',
            message: '此条必填',
          },
        ]}
        label={
          <Tooltip title="仅支持搜索当前区域猫咪">
            目标猫咪 <QuestionCircleOutlined />
          </Tooltip>
        }
      >
        <Select
          showSearch
          value={catInfo}
          onSearch={handleSearch}
          defaultActiveFirstOption={false}
          suffixIcon={null}
          filterOption={false}
          notFoundContent={null}
          options={catInfo.map((d: any) => ({
            value: d.id,
            label: d.name,
          }))}
        ></Select>
      </Form.Item>
      <Form.Item
        name="planType"
        label="计划类型"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      >
        <Radio.Group
          options={[
            {
              label: '绝育',
              value: 1,
            },
            {
              label: '治病',
              value: 2,
            },
            {
              label: '加餐',
              value: 3,
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="planState"
        label="计划状态"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      >
        <Radio.Group
          options={[
            {
              label: '募集中',
              value: 1,
            },
            {
              label: '实施中',
              value: 2,
            },
            {
              label: '已完成',
              value: 3,
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="maxFish"
        label="小鱼干数量"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      >
        <InputNumber precision={0} />
      </Form.Item>
      <Form.Item
        name="planTime"
        label="计划时间"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      >
        <RangePicker />
      </Form.Item>
      <Form.Item
        name="coverUrl"
        label="计划封面图"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      >
        <UploadImagesFormItem limit={1} />
      </Form.Item>
      <ProFormTextArea
        name="description"
        label="详细介绍"
        rules={[
          {
            required: true,
            message: '此条必填',
          },
        ]}
      />
      <ProFormTextArea name="instruction" label="执行说明" />
      <ProFormTextArea name="summary" label="计划总结" />
      <Form.Item name="imageUrls" label="结束返图">
        <UploadImagesFormItem limit={9} />
      </Form.Item>
    </DrawerForm>
  );
};

export default Create;
