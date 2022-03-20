import { CloseCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row } from "antd";

import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { SocketContext } from "../context/SocketContext";
import { getUsers } from "../helpers/getUsers";
import { useHide } from "../hooks/useHide";

export const Desktop = () => {
  useHide(false);
  const history = useHistory();

  const [user] = useState(getUsers());
  const { socket } = useContext(SocketContext);
  const [currentTicket, setcurrentTicket] = useState(null);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("desktop");
    history.replace("/login");
  };

  const nextTicket = () => {
    socket.emit("next-ticket-assing", user, (ticket) => {
      setcurrentTicket(ticket);
    });
  };

  if (!user.user || !user.desktop) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title>{user.user}</Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text type="success">{user.desktop}</Text>
        </Col>
        <Col span={4} align="rigth">
          <Button shape="round" type="danger" onClick={logout}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />

      {currentTicket ? (
        <Row>
          <Col>
            <Text>Está atentiendo el ticket número: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {currentTicket.number}
            </Text>
          </Col>
        </Row>
      ) : (
        "No hay tickets pendientes"
      )}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button onClick={nextTicket} shape="round" type="primary">
            <RightCircleOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
