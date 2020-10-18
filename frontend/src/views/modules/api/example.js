import React from 'react';
import axios from 'axios';
import { useAsync } from './state';

async function login() {
  const response = await axios.post(
    '{baseUrl}/api/auth/login',
    { id: 'test', pw: 'test' }
  );
  return response.data;
}

async function unitList() {
  const response = await axios.get(
    '{baseUrl}/api/unit/list'
  );
  return response.data;
}

export default function View() {
  const [state, refetch] = useAsync(login);
  const { loading, data, error } = state;
  console.log(data);
  if (loading) return <div>로딩중 ...</div>;
if (error) return <div>{String(error)}</div>;
  if (!data) return <button onClick={refetch}>불러오기</button>;
  return (
    <div>
      <div>{data.blabla}</div>
    </div>
  );

}