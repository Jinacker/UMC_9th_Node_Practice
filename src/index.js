// const express = require('express')  // -> CommonJS
import express from 'express'          // -> ES Module

// 환경 변수 로드
import dotenv from 'dotenv';
dotenv.config();

// MySQL import
import mysql from 'mysql2/promise';


const app = express()
const port = 3000

// 환경변수 로드해서 DB 커넥션 풀 연결
const db = await mysql.createConnection(process.env.DB_URL);
console.log("MySQL 연결 성공!");

app.get('/', (req, res) => {
  res.send('Hello Worldz')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})