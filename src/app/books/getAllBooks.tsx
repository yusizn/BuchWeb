'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import styles from './page.module.css';

interface Book {
    titel: string;
    isbn: string;
    preis: number;
    homepage: string;
    datum: string;
    rabatt: string;
}

const GetAllBooks = () => {
  const [dictOfBooks, SetDictOfBooks] = useState<Book[]>([]);

  const isbn = useParams();

  useEffect(() => {
    console.log(isbn.id);
    axios.get(`https://localhost:3000/rest/`).then((res) => {
      // wichtigen Teil des Responses filtern
      const bookList = res['data']['_embedded']['buecher'].map(
        (bookData: any) => {
          const book = {
            titel: bookData.titel.titel,
            isbn: bookData.isbn,
            preis: bookData.preis,
            homepage: bookData.homepage,
            datum: bookData.datum,
            rabatt: (bookData.rabatt * 100).toFixed(1),
          };
          return book;
        },
      );
      SetDictOfBooks(bookList);
      console.log(bookList);
      console.log(res);
      return res;
    });
  }, [isbn.id]);

  return (
    <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th>ISBN</th>
            <th>Titel</th>
            <th>Preis</th>
            <th>Homepage</th>
            <th>Datum</th>
            <th>Rabatt</th>
          </tr>
        </thead>
        <tbody>
          {dictOfBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.isbn}</td>
              <td>{book.titel}</td>
              <td>{book.preis}</td>
              <td>
                <a href={book.homepage}>{book.homepage}</a>
              </td>
              <td>{book.datum}</td>
              <td>{book.rabatt}%</td>
            </tr>
          ))}
        </tbody>
    </table>
  )
}

export default GetAllBooks;