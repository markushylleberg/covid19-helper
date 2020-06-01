import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    const handleLogout = async () => {
      await fetch('/user/logout', {
        method: 'GET',
      }).then((res) => {
        if (res.status === 200) {
          history.push('/login');
        }
      });
    };
    handleLogout();
  });

  return <></>;
};

export default Logout;
