import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import '../src/index.css'
import SearchTop from './components/searchtop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
<Header />
<SearchTop />
</>
)