export const GET_HISTORY_PAYMENT_IPAYMU_SUCCESS = "GET_HISTORY_PAYMENT_IPAYMU_SUCCESS";
export const GET_TOKO_BY_KODE_SUCCESS = "GET_TOKO_BY_KODE_SUCCESS";

export type GetHistoryPaymentiPaymuReportType = {
    Status: Number;
    Data: {
        transaction: [{
            TransactionId: Number;
            SessionId: String;
            ReferenceId: String;
            RelatedId: Number;
            Sender: String;
            Receiver: String;
            Amount: String;
            Fee: String;
            Status: Number;
            StatusDesc: String;
            Type: Number;
            TypeDesc: String;
            Notes: String;
            IsEscrow: Boolean;
            CreatedDate: String;
            ExpiredDate: String;
            SuccessDate: String;
            SettlementDate: String;
            PaymentChannel: String;
            PaymentCode: String;
            BuyerName: String;
            BuyerPhone: String;
            BuyerEmail: String;
        }]
    }
}

export type DataTrxiPaymu = {
    TransactionId: Number;
    SessionId: String;
    ReferenceId: String;
    RelatedId: Number;
    Sender: String;
    Receiver: String;
    Amount: String;
    Fee: String;
    Status: Number;
    StatusDesc: String;
    Type: Number;
    TypeDesc: String;
    Notes: String;
    IsEscrow: Boolean;
    CreatedDate: String;
    ExpiredDate: String;
    SuccessDate: String;
    SettlementDate: String;
    PaymentChannel: String;
    PaymentCode: String;
    BuyerName: String;
    BuyerPhone: String;
    BuyerEmail: String;
}


export type TableHistoryPaymentiPaymuReportType = {
    key: number
    TransactionId: Number;
    SessionId: String;
    ReferenceId: String;
    RelatedId: Number;
    Sender: String;
    Receiver: String;
    Amount: String;
    Fee: String;
    Status: Number;
    StatusDesc: String;
    Type: Number;
    TypeDesc: String;
    Notes: String;
    IsEscrow: Boolean;
    CreatedDate: String;
    ExpiredDate: String;
    SuccessDate: String;
    SettlementDate: String;
    PaymentChannel: String;
    PaymentCode: String;
    BuyerName: String;
    BuyerPhone: String;
    BuyerEmail: String;
}