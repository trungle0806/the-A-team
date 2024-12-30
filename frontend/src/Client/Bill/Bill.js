import React from "react";
import "./ThankYouBill.css";

const ThankYouBill = ({ donationData }) => {
  return (
    <div className="container">
      <div className="logo">
        <img src={donationData.logoUrl} alt="Give-AID Logo" />
      </div>
      <div className="header">
        <h1>Cảm Ơn Bạn!</h1>
        <p>Quyên góp của bạn giúp chúng tôi mang lại sự thay đổi tích cực.</p>
      </div>
      <div className="details">
        <p>
          <span className="label">Người quyên góp:</span> {donationData.donorName}
        </p>
        <p>
          <span className="label">Email:</span> {donationData.donorEmail}
        </p>
        <p>
          <span className="label">Tổ chức:</span> Give-AID
        </p>
        <p>
          <span className="label">Số tiền quyên góp:</span>{" "}
          {donationData.donationAmount} VND
        </p>
        <p>
          <span className="label">Ngày quyên góp:</span>{" "}
          {donationData.donationDate}
        </p>
        <p>
          <span className="label">Phương thức thanh toán:</span>{" "}
          {donationData.paymentMethod}
        </p>
      </div>
      <div className="footer">
        <p>
          Truy cập <a href="https://give-aid.org">Give-AID.org</a> để biết thêm
          thông tin về các hoạt động của chúng tôi.
        </p>
        <p>Một lần nữa, chúng tôi chân thành cảm ơn bạn!</p>
      </div>
    </div>
  );
};

export default ThankYouBill;
