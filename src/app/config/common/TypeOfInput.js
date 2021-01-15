export const TYPE_OF_INPUT = [
    {
        id: 1,
        type: "Câu hỏi văn bản đơn"
    },
    {
        id: 2,
        type: "Câu hỏi dạng bình luận đơn"
    },
    {
        id: 10,
        type: "Câu hỏi dạng số"
    },
    {
        id: 3,
        type: "Câu hỏi một đáp án"
    },
    {
        id: 4,
        type: "Câu hỏi nhiều đáp án"
    },
    {
        id: 5,
        type: "Bảng câu hỏi một đáp án"
    },
    {
        id: 6,
        type: "Bảng câu hỏi nhiều đáp án"
    },
    // {
    //     id: 7,
    //     type: "Bảng câu hỏi văn bản"
    // },
    // {
    //     id: 8,
    //     type: "Bảng câu hỏi văn bản đơn"
    // },
    {
        id: 9,
        type: "Bảng câu hỏi đa dạng"
    },
    {
        id: 11,
        type: "Bảng câu hỏi lựa chọn"
    },
    {
        id: 12,
        type: "Bảng câu hỏi theo cột"
    },
    {
        id: 13,
        type: "Bảng câu hỏi theo hàng"
    }
]

export const SINGLE_TEXTBOX = 1;
export const COMMENT_BOX = 2;
export const SINGLE_CHOISE = 3;
export const MULTI_CHOISE = 4;
export const GRID_SINGLE_CHOISE = 5;
export const GRID_MULTI_CHOISE = 6;
export const GRID_TEXTBOX = 7;
export const GRID_SINGLE_TEXT = 8;
export const GRID_MIX = 9;
export const SINGLE_NUMBER = 10;
export const GRID_SELECT = 11;
export const GRID_BY_COLUMN = 12;
export const GRID_BY_ROW = 13;

export const TYPE_OF_COLUMNS = [{
    value: 1,
    type: 'Văn bản'
}, {
    value: 2,
    type: 'Chữ số'
}, {
    value: 3,
    type: 'Chọn nhiều'
}, {
    value: 4,
    type: 'Chọn một'
}]

export const TYPE_GRID_SELECT = [{
    value: 1,
    type: 'Văn bản'
}, {
    value: 2,
    type: 'Chữ số'
}]

export const TYPE_GRID_ROW_COL = [
    {
        value: 4,
        type: 'Chọn một'
    }, {
        value: 3,
        type: 'Chọn nhiều'
    }
]

export const STRING = 1;
export const NUMBER = 2;
export const CHECKBOX = 3;
export const RADIO = 4;
export const GROUP = 5;

export const GRID_TEXTBOX_ROW_LABEL = [{ title: "Nội dung hàng 1", unique: 'abcdefgh' },
{ title: "Nội dung hàng 2", unique: 'iklmnopq' },
{ title: "Nội dung hàng 3", unique: 'rstuvxyz' }]