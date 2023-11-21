import UploadImagesFormItem from '@/components/UploadImagesFormItem';
import { fetchCatList } from '@/services/cat';
import { editPlan, fetchCurrentDriedFish } from '@/services/dried-fish';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { DrawerForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, InputNumber, Select, Tooltip, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

const Edit = ({ open, setEditVisible, actionRef, currentDriedFish }: any) => {
  const [form] = Form.useForm();
  const [catInfo, setCatInfo] = useState([]);

  const handleSearch = async (value: any) => {
    const msg = await fetchCatList({
      // @ts-ignore
      communityId: localStorage.getItem('communityId'),
      page: 0,
      keyword: value,
    });
    setCatInfo(msg.cats);
  };

  const handleEdit = async (value: any) => {
    const startTime = moment(value?.planTime?.[0])?.startOf('day')?.valueOf();
    const endTime = moment(value?.planTime?.[1])?.startOf('day')?.valueOf();
    delete value?.planTime;
    const data = {
      ...value,
      id: currentDriedFish,
      communityId: localStorage.getItem('communityId'),
      coverUrl: value?.coverUrl?.[0],
      startTime,
      endTime,
    };
    const success = await editPlan(data);
    if (success) {
      setEditVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (currentDriedFish) {
        const data = await fetchCurrentDriedFish({ planId: currentDriedFish });
        form.setFieldsValue(data?.plan);
      }
    })();
  }, [currentDriedFish]);

  return (
    <DrawerForm
      title="编辑小鱼干计划"
      width="600px"
      open={open}
      onOpenChange={setEditVisible}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      onFinish={handleEdit}
      form={form}
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
      <ProFormRadio.Group
        name="planType"
        label="计划类型"
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
      <ProFormRadio.Group
        name="planState"
        label="计划状态"
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
      <Form.Item name="maxFish" label="小鱼干数量">
        <InputNumber precision={0} />
      </Form.Item>
      <Form.Item name="planTime" label="计划时间">
        <RangePicker />
      </Form.Item>
      <Form.Item name="coverUrl" label="计划封面图">
        <UploadImagesFormItem limit={1} />
      </Form.Item>
      <ProFormTextArea name="description" label="详细介绍" />
      <ProFormTextArea name="instruction" label="执行说明" />
      <ProFormTextArea name="summary" label="计划总结" />
      <Form.Item name="imageUrls" label="结束返图">
        <UploadImagesFormItem limit={9} />
      </Form.Item>
    </DrawerForm>
  );
};

export default Edit;
