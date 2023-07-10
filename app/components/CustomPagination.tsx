'use client'

import React from 'react'
import { Pagination } from '@mui/material'
import { useEffect, useState } from "react";
import axios from "axios";

const CustomPagination = () => {
  //pageApi
  const [page, setPage] = useState(1);
  //API
  const [api, setApi] = useState([] as any[]);
  const ApiAddress = axios.create({
    baseURL: "/",
  });
  useEffect(() => {
    axios
      .get("?page=" + page)
      .then((response: any) => setApi(response.data.results))
      .catch((err: any) => console.log(err));
  }, [page]);

  return (
    <div className="flex mt-10 items-center justify-center">
      {page}
      <Pagination count={10} onChange={(e, value) => setPage(value)} />
    </div>
  );
};

export default CustomPagination;
