export const NUMBER_VALIDATOR = /^-?\d*(\.\d+)?$/
export const PHONE_VALIDATOR = /^[0-9]{9,15}$/
export const STORE_KEY = 'Management-System-Store'

export const TYPE_LIST = [
  {
    type: 2,
    label: 'Xuất',
    type_label: 'success'
  },
  {
    type: 1,
    label: 'Nhập',
    type_label: 'warning'
  },
  {
    type: 3,
    label: 'Hoàn tiền',
    type_label: 'danger'
  },
  {
    type: 'CHUYEN_TIEN_NOI_BO',
    label: 'Chuyển tiền',
    type_label: 'danger'
  }
]

export const TYPE_LIST_TRANSACTION = [
  {
    type: 2,
    label: 'Xuất',
    type_label: 'success'
  },
  {
    type: 1,
    label: 'Nhập',
    type_label: 'warning'
  },
  {
    type: 3,
    label: 'Hoàn tiền',
    type_label: 'danger'
  }
]

export const STATUS_LIST = [
  {
    value: 0,
    label: 'Đã tạo'
  },
  {
    value: 1,
    label: 'Đã duyệt'
  }
]
