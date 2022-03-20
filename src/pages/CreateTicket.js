import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useHide } from "../hooks/useHide";

export const CreateTicket = () => {
  useHide(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const newTicket = () => {
    socket.emit("request-ticket", null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>Presione el botón para un nuevo ticket</Title>

          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={newTicket}
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>
      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Su número</Text>
            <br />
            <Text type="success" style={{ fontSize: 50 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
