import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ message }) => (
  <div>
    <div>Error 404 - {message}</div>
    <Link to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
