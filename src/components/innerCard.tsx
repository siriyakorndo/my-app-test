import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined, ShareAltOutlined, StopOutlined } from '@ant-design/icons';

const InnerCard: React.FC<{ data: cardInnerType }> = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "2px",
        borderRadius: "5px",
        margin: "5px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            textAlign: "center", flex: 1
          }}
        >
          <div
            style={{
              backgroundColor: "#21b498",
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              left: 0,
              top: -10,
              color:"#fff"
            }}
          >
            {data.id}
          </div>
          <Avatar
            size={56}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#f0f2f5", color: "#595959" }}
          />
        </div>

        <div style={{ flex: 2 }}>
          <div style={{fontWeight:"bold"}}>{data.patientName}</div> 
          <div>{data.patientCode}</div>
        </div>
        
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#2f4168",
              textAlign: "center",
              width: "25px",
              height: "25px",
              float: "right",
              color:"#fff"

            }}
          >
            {data.status}
          </div>
          <div
            style={{
              marginTop: "50px", display: "flex",
              justifyContent: "space-between"
            }}
          >
            <ShareAltOutlined style={{ padding: "10px" }} />
            <StopOutlined style={{ color: "red", fontSize: "16px", padding: "10px" }} />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>{data.daysLeft} วัน</div>
    </div>
  );
};

export default InnerCard;
