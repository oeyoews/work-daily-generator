// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function Table() {
  // 表格数据
  const [data, setData] = useState([]);

  // 保存处于编辑状态的数据
  const [currentRows, setCurrentRows] = useState([]);
  // 编辑数据的id
  const [currentIds, setCurrentIds] = useState([]);

  // 编辑
  const editRow = (row) => {
    setCurrentRows((pre) => [...pre, row]);
    console.log(row.id);
  };

  // 删除
  const deleteRow = () => {
    set;
  };

  // 保存
  const saveRow = () => {};
  // 取消
  const cancelRow = () => {
    // remove currentrow
  };

  // 新增行
  const addNew = () => {
    const init = {
      id: crypto.randomUUID(),
      text: 99,
    };
    setData((pre) => [...pre, init]);
  };

  // 取消正在编辑的行
  const removeId = (id) => {
    // setCurrentIds(xxx)
  };

  const isCurrentRow = (row) => {
    console.log(row);
    return currentRows.find((item) => item.id === row.id);
  };

  // useEffect(() => {
  //   const init = {
  //     id: 1,
  //     text: 99,
  //   };
  //   setData((pre) => [...pre, init]);
  // }, []);

  return (
    <div>
      {JSON.stringify(currentRows)}
      <Button onClick={addNew}>addnew</Button>
      <ul>
        {data.map((row) => {
          return (
            <li key={row.id}>
              {!isCurrentRow(row) && (
                <div>
                  {row.id} {row.text}
                  <Button onClick={(e) => editRow(row)}>edit</Button>
                  <Button onClick={(e) => deleteRow(row)}>delete</Button>
                </div>
              )}
              {isCurrentRow() && (
                <div>
                  <Button onClick={(e) => saveRow(row)}>save</Button>
                  <Button onClick={cancelRow}>cancel</Button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
