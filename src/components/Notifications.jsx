import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { toast } from "react-toastify";
import ModalCustom from './ModalCustom';
import MessagesNotifications from './MessagesNotifications';

function notificationsLabel(count) {
  if (count === 0) {
    return 'No hay notificaciones';
  }
  if (count > 99) {
    return 'Mas de 99 notificaciones';
  }
  return `${count} notifications`;
}

export default function Notifications() {
    const userName = sessionStorage.getItem("userName");
    const [countNotifications, setCountNotifications] = useState(0);
    const [dataNotification, setDataNotification] = useState([]);
    const [openNotifications, setOpenNotifications] = useState(false);
    const handleCloseNotifications = () => setOpenNotifications(false);
    const handleOpenNotifications = () => setOpenNotifications(true);
    const getDataNotifications = () => {
        fetch("https://backend-bancolombia.onrender.com/notifications?notificationTo=" + userName)
          .then((res) => res.json())
          .then((notifications) => {
            setCountNotifications(notifications.length);
            setDataNotification(notifications)
          })
          .catch((err) => {
            toast.error("Failed service: " + err.message);
          });
      };
    useEffect(() => {
        getDataNotifications();
    }, [])
  return (
    <>
        <IconButton aria-label={notificationsLabel(countNotifications)} onClick={handleOpenNotifications}>
        <Badge badgeContent={countNotifications} color="secondary">
            <MailIcon />
        </Badge>
        </IconButton>
        <ModalCustom handleClose={handleCloseNotifications} open={openNotifications}>
            <MessagesNotifications />
        </ModalCustom>
    </>
  );
}