import React, { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return <div>Login</div>;
}
