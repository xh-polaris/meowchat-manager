import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    FooterToolbar,
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { CAT_MESSAGE_COLUMNS } from './settings';

// const handleAdd = async (fields: API.RuleListItem) => {
// };

const handleRemove = async (selectedRows: API.RuleListItem[]) => {
};

export type CatMessageItems = {
    key: number;
    cat_name: string;
    create_by: string;
    update_by: string;
    date_at: number;
    cat_status: number;
    content_collect: string;
};

const CatMessage: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

    const columns: ProColumns[] = [
        ...CAT_MESSAGE_COLUMNS,
    ];

    const data: CatMessageItems[] = [
        {
            key: 1,
            cat_name: '小咪',
            create_by: '程1',
            update_by: '程1',
            date_at: 1670513455,
            cat_status: 1,
            content_collect: '这是第一只猫',
        },
        {
            key: 2,
            cat_name: '大咪',
            create_by: '程2',
            update_by: '程2',
            date_at: 1670513543,
            cat_status: 2,
            content_collect: '这是第二只猫',
        },
    ]

    return (
        <PageContainer>
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle={'猫咪信息'}
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                    >
                        <PlusOutlined />新建
                    </Button>,
                ]}
                // request={rule}
                dataSource={data}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择
                            <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                            项
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
                    <Button type="primary">
                        批量审批
                    </Button>
                </FooterToolbar>
            )}
        </PageContainer>
    );
};

export default CatMessage;
