import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createobjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objectStore = tx.objectStore('jate');
  const req = objectStore.put({ id: id, value: value })
  const res = await req;
  console.log('data saved to the jateDB', res);
};

export const getDb = async (value) => {
  console.log('Getting data from the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objectStore = tx.objectStore('jate');
  const req = objectStore.getAll()
  const res = await req;
  console.log('data saved to the jateDB', res);
};

initdb();