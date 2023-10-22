import { useEffect, useState } from 'react';

function App() {
  const [urls, setUrls] = useState(null);

  const fetchUrls = async () => {
    try {
      const res = await fetch('http://localhost:3000');

      const data = await res.json();

      if (res.ok) {
        setUrls(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <div className='new__url'>
        <p>Generate url</p>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              fetch('http://localhost:3000', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: inputValue }),
              }).then(() => {
                fetchUrls();
              });
            }}
          >
            <input
              type='text'
              name='url'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type='submit'>Generate</button>
          </form>
        </div>
      </div>
      <div className='url__list'>
        <div>
          <p>Initial Url</p>
          <p>Generated Url</p>
          <div>Delete</div>
        </div>
        {urls &&
          urls.map((url) => (
            <div key={url.id}>
              <p>{url.initialUrl}</p>
              <p>{url.generatedUrl}</p>
              <button
                onClick={() => {
                  fetch(`http://localhost:3000/${url.id}`, {
                    method: 'DELETE',
                  }).then((res) => {
                    fetchUrls();
                  });
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
