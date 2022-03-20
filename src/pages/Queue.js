import { Card, Col, Divider, List, Row, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useHide } from "../hooks/useHide";

export const Queue = () => {
  useHide(true);

  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    const res = await fetch("http://localhost:8080/latest");
    const { latest } = await res.json();

    return latest;
  };

  useEffect(() => {
    getTickets().then((tickets) => setTickets(tickets));
  }, []);

  useEffect(() => {
    socket.on("ticket-assinged", (tickets) => {
      setTickets(tickets);
    });
    return () => {
      socket.off("ticket-assinged");
    };
  }, [socket]);

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano">{item.user}</Tag>,
                    <Tag color="magenta">Escritorio: {item.desktop}</Tag>,
                  ]}
                >
                  <Title>No. {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider> Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio: </Text>
                      <Tag color="magenta">{item.number}</Tag>
                      <Text type="secondary">Agente: </Text>
                      <Tag color="volcano">{item.user}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
    </>
  );
};
