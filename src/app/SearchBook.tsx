'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBook() {
  const router = useRouter();
  const [pathId, SetPathId] = useState('');
  const [path, SetPath] = useState('');
  const [placeholderText, SetPlaceholderText] = useState('');

  useEffect(() => {
    console.log(pathId);
    SetPlaceholderText(
      'Klicke den Button an, um entweder mit ISBN oder Titel zu suchen!',
    );
  }, [pathId]);

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/${path}/${pathId}`);
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1"></label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder={placeholderText}
          onChange={(e) => SetPathId(e.target.value)}
          onKeyPress={handleKeyPress}
          value={pathId}
          style={{ width: '300%' }}
        />
      </div>
      <div>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              SetPath('titel');
              SetPlaceholderText('Gebe den Titel ein');
            }}
          >
            Titel
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              SetPath('isbn');
              SetPlaceholderText('Gebe die ISBN ein');
            }}
          >
            ISBN
          </button>
        </div>
      </div>
      <div>
        <br />
        <Link href={`/${path}/${pathId}`}>
          <button type="button" className="btn btn-secondary btn-lg btn-block">
            Suchen
          </button>
        </Link>
      </div>
    </>
  );
}
