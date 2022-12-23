import {
    CREATE_BY,
    UPDATE_BY,
    OPERATIONS,
    CAT_NAME,
    CONTENT_COLLECT,
    DATE_AT,
    CAT_STATUS,
} from '@/pages/commonSettings';

const MAX_ORDER = 10;

export const CAT_MESSAGE_COLUMNS = [
    {
        order: MAX_ORDER - 10,
        ...CAT_NAME,
    },
    {
        order: MAX_ORDER - 8,
        ...CREATE_BY,
    },
    {
        order: MAX_ORDER - 6,
        ...UPDATE_BY,
    },
    {
        order: MAX_ORDER - 4,
        ...DATE_AT,
    },
    {
        order: MAX_ORDER - 2,
        ...CAT_STATUS,
    },
    {
        order: MAX_ORDER,
        ...CONTENT_COLLECT,
    },
    {
        order: MAX_ORDER + 2,
        ...OPERATIONS,
        render: () => <a>编辑</a>
    },
];  