import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import NotFound from './components/NotFound';
import {BrowserRouter, Match, Miss } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={App} />	
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	);
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();
